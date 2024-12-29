using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using GitHubAuthenticationWithASPNET.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace GitHubAuthenticationWithASPNET.controllers;

[ApiController]
[Route("api/[controller]")]
public class GitHubController : ControllerBase
{
    private readonly string ClientId; // Replace with your client ID
    private readonly string ClientSecret; // Replace with your client secret
    private readonly string AuthorizeUrl;
    private readonly string TokenUrl;
    private readonly string ApiBaseUrl;
    private readonly IDistributedCache _cache;

    private readonly IConfiguration _configuration;

    public GitHubController(IConfiguration configuration, IDistributedCache cache)
    {
        _configuration = configuration;
        ClientId = _configuration["CLIENT_ID"]!;
        ClientSecret = _configuration["CLIENT_SECRET"]!;
        AuthorizeUrl = _configuration["AUTHORIZE_URL"]!;
        TokenUrl = _configuration["TOKEN_URL"]!;
        ApiBaseUrl = _configuration["API_BASE_URL"]!;
        _cache = cache;
    }

    private string GenerateRandomBytes()
    {
        byte[] randomBytes = new byte[16];

        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }

        return Convert.ToHexStringLower(randomBytes).Replace("-", "");
    }

    [HttpGet("access-token")]
    public async Task<IActionResult> GetAccessToken()
    {
        var accessToken = await _cache.GetStringAsync("access_token");
        if (accessToken == null)
        {
            return Unauthorized();
        }
        System.Console.WriteLine($"Access Token: {accessToken}");

        return Ok(new { accessToken });
    }


    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await _cache.RemoveAsync("access_token");

        return Ok(new { message = "Logged out successfully" });
    }

    [HttpGet("login")]
    public async Task<IActionResult> Login()
    {
        // Delete the existing access_token cookie if it exists

        var client = new HttpClient();
        var state = GenerateRandomBytes();
        HttpContext.Session.SetString("state", state);

        var parameters = new Dictionary<string, string>
        {
            ["response_type"] = "code",
            ["client_id"] = ClientId,
            ["scope"] = "user public_repo private_repo",
            ["state"] = state,
        };
        var uriBuilder = new UriBuilder(AuthorizeUrl) { Port = -1 };
        var query = HttpUtility.ParseQueryString(uriBuilder.Query);

        foreach (var parameter in parameters)
        {
            query[parameter.Key] = parameter.Value;
        }

        uriBuilder.Query = query.ToString();
        var queryString = uriBuilder.ToString();

        var responseObject = new
        {
            loginUrl = queryString
        };

        return Ok(responseObject);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> Callback(string code, string state)
    {
        HttpContext.Response.Cookies.Delete("access_token");  // Clear existing cookie if it exists
        // Validate the state parameter (optional)
        if (state != HttpContext.Session.GetString("state"))
        {
            return Unauthorized();
        }

        var client = new HttpClient();
        var response = await client.PostAsync(TokenUrl, new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "authorization_code",
            ["client_id"] = ClientId,
            ["client_secret"] = ClientSecret,
            ["redirect_uri"] = $"{_configuration["BACKEND_URL"]}/api/github/callback",
            ["code"] = code
        }));

        var responseContent = TokenExtractor.ExtractGithubToken(await response.Content.ReadAsStringAsync());

        // Use the access token to fetch user data or complete your logic here
        var frontendUrl = _configuration["FRONTEND_URL"] ?? _configuration["FrontendUrl"];

        var redirectUrl = $"{frontendUrl}";
        await _cache.SetStringAsync("access_token", responseContent.AccessToken, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(30)
        });
        //         HttpContext.Response.Cookies.Append("access_token", responseContent.AccessToken, new CookieOptions
        // {
        //     // HttpOnly = true,
        //     Secure = true,
        //     SameSite = SameSiteMode.None,
        //     MaxAge = TimeSpan.FromDays(30),
        //     IsEssential = true,
        //     HttpOnly = true,
        //     Expires = DateTimeOffset.Now.AddDays(30)
        // });
        return Redirect(redirectUrl); // Example of returning the response
    }

}
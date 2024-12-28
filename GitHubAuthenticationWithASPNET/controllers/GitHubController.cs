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
using Microsoft.Extensions.Logging;

namespace GitHubAuthenticationWithASPNET.controllers;

[ApiController]
[Route("api/[controller]")]
public class GitHubController : ControllerBase
{
    private const string ClientId = "Ov23liV7SF34RfpFcbNf"; // Replace with your client ID
    private const string ClientSecret = "5282cdd67271bd84a71a927645c1d0f545d11fdb"; // Replace with your client secret
    private const string AuthorizeUrl = "https://github.com/login/oauth/authorize";
    private const string TokenUrl = "https://github.com/login/oauth/access_token";
    private const string ApiBaseUrl = "https://api.github.com/";

    private readonly IConfiguration _configuration;

    public GitHubController(IConfiguration configuration)
    {
        _configuration = configuration;
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

    [HttpGet("login")]
    public async Task<IActionResult> Login()
    {
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
            ["redirect_uri"] = "https://localhost:8002/api/github/callback",
            ["code"] = code
        }));

        var responseContent = TokenExtractor.ExtractGithubToken(await response.Content.ReadAsStringAsync());

        // Use the access token to fetch user data or complete your logic here
        var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:8000";

        var redirectUrl = $"{frontendUrl}";
        HttpContext.Response.Cookies.Append("access_token", responseContent.AccessToken);
        return Redirect(redirectUrl); // Example of returning the response
    }

}
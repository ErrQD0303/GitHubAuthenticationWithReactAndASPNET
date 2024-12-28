using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using GitHubAuthenticationWithASPNET.Models;

namespace GitHubAuthenticationWithASPNET.Helpers;

public static class TokenExtractor
{
    public static GithubResponse ExtractGithubToken(string responseString)
    {
        var queryParams = HttpUtility.ParseQueryString(responseString);

        // Extract the individual values
        return new GithubResponse()
        {
            AccessToken = queryParams["access_token"] ?? string.Empty,
            Scope = queryParams["scope"] ?? string.Empty,
            TokenType = queryParams["token_type"] ?? string.Empty,
        };
    }
}
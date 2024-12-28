using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitHubAuthenticationWithASPNET.Models;

public class GithubResponse
{
    public string AccessToken { get; set; } = string.Empty;
    public string Scope { get; set; } = string.Empty;
    public string TokenType { get; set; } = string.Empty;
}
using Microsoft.AspNetCore.Builder;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    var kestrelSection = builder.Configuration.GetSection("Kestrel");
    if (!kestrelSection.Exists()) return;

    serverOptions.Configure(kestrelSection);
});

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? builder.Configuration["FrontendUrl"];
        System.Console.WriteLine($"FRONTEND_URL: {frontendUrl}");
        policy.WithOrigins(frontendUrl!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });

    options.AddPolicy("AllowLocalhost", policy =>
    {
        var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? builder.Configuration["FrontendUrl"];
        System.Console.WriteLine($"FRONTEND_URL: {frontendUrl}");
        policy.WithOrigins(frontendUrl!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var env = builder.Environment;

builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = "Github.Session";
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = true;  // Ensure cookie cannot be accessed via JavaScript
    options.Cookie.SameSite = SameSiteMode.None;  // Ensure SameSite policy is configured for cross-origin requests
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure cookies are sent over HTTPS
});

var app = builder.Build();


app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseRouting();
app.UseSession();
app.MapControllers();

await app.RunAsync();
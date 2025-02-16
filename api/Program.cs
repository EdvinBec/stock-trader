using api.services;
using api.settings;
using api.utility;

var builder = WebApplication.CreateBuilder(args);

// Register Swagger services
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin() // Allow requests from any origin
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Yahoo Web Scraping service
builder.Services.AddHttpClient<YahooScrapeService>(client =>
{
    var config = builder.Configuration.GetSection("YahooScraper").Get<YahooScraperSettings>();
    if (config == null) throw new InvalidOperationException("YahooScraper settings are missing in configuration.");
    client.BaseAddress = new Uri(config!.BaseURL);
});

builder.Services.AddHttpClient<AlphaVintageApiService>(client =>
{
    var config = builder.Configuration.GetSection("AlphaVintage").Get<AlphaVintageApiServiceSettings>();
    if (config == null) throw new InvalidOperationException("YahooScraper settings are missing in configuration.");
    client.BaseAddress = new Uri(config!.BaseURL);
});

builder.Services.AddSingleton<StockData>();

// Add controllers to the service container
builder.Services.AddControllers();

var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTPS request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // This generates the Swagger JSON
    app.UseSwaggerUI(); // This serves the Swagger UI
}

// Ensure that the controllers are mapped
app.MapControllers();

app.UseHttpsRedirection();

app.Run();

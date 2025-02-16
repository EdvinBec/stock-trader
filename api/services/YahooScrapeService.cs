using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.settings;
using Microsoft.Extensions.Options;

namespace api.services
{
    public class YahooScrapeService
    {
        private readonly HttpClient _client;
        private readonly string _baseURL;

        public YahooScrapeService(HttpClient client, IOptions<YahooScraperSettings> options)
        {
            _client = client;
            _client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0");
            _client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
            _baseURL = options.Value.BaseURL;
        }

        public async Task<string> FetchHtml(string urlExtension)
        {
            return await _client.GetStringAsync($"{_baseURL + urlExtension}");
        }
    }
}
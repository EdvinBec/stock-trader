using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.settings;
using Microsoft.Extensions.Options;

namespace api.services
{
    public class AlphaVintageApiService
    {
        private readonly HttpClient _client;
        private readonly string _baseURL;
        private readonly string _apiKey;

        public AlphaVintageApiService(HttpClient client, IOptions<AlphaVintageApiServiceSettings> options, IConfiguration config)
        {
            _client = client;
            _baseURL = options.Value.BaseURL;
            _apiKey = config["AlphaVintage:ApiKey"];
        }

        public async Task<string> GetOptionsData(string urlExtension)
        {
            string url = $"{_baseURL}{urlExtension}&apikey={_apiKey}";
            string response = await _client.GetStringAsync(url);
            return response;
        }
    }
}
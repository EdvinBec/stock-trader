using api.services;
using api.utility;
using Microsoft.AspNetCore.Mvc;
using HtmlAgilityPack;
using api.models;
using Microsoft.AspNetCore.Components.Forms;
using System.Text.Json;
using System.Globalization;


namespace api.controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase

    {
        private readonly YahooScrapeService _yahooScrapeService;
        private readonly AlphaVintageApiService _alphaVintageApiService;
        private readonly StockData _stockData;

        public StockController(YahooScrapeService yahooScrapeService, StockData stockData, AlphaVintageApiService alphaVintageApiService)
        {
            _yahooScrapeService = yahooScrapeService;
            _stockData = stockData;
            _alphaVintageApiService = alphaVintageApiService;
        }

        [HttpGet("{ticker}")]
        public async Task<IActionResult> GetStockDetails(string ticker)
        {
            try
            {
                var htmlResponse = await _yahooScrapeService.FetchHtml($"/quote/{ticker}/options");
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(htmlResponse);

                //It finds the nodes based on their data-testId
                var closeMarketPriceData = _stockData.GetStockPriceDetails(htmlDoc, new string[] { "qsp-price" }, new string[] { "qsp-price-change" }, new string[] { "qsp-price-change-percent" }, "//div[@slot='marketTimeNotice' and contains(@class, 'marketTime')]//span[contains(@class, 'yf-vednlp')]//span[contains(@class, 'yf-ipw1h0')]");
                var preMarketPriceData = _stockData.GetStockPriceDetails(htmlDoc, new string[] { "qsp-post-price", "qsp-pre-price" }, new string[] { "qsp-post-price-change", "qsp-pre-price-change" }, new string[] { "qsp-post-price-change-percent", "qsp-pre-price-change-percent" }, "//div[@slot='marketTimeNotice' and not(contains(@class, 'marketTime'))]//span[contains(@class, 'yf-vednlp')]//span[contains(@class, 'yf-ipw1h0')]");

                var stockName = htmlDoc.DocumentNode.SelectSingleNode("//h1[contains(@class, 'yf-xxbei9')]").InnerText.Trim();

                if (closeMarketPriceData == null || stockName == null)
                {
                    return NotFound(new { error = "Stock data not found." });
                }

                return Ok(new StockDetails
                {
                    ticker = ticker,
                    stockName = stockName,
                    closingPrice = closeMarketPriceData,
                    preMarketPrice = preMarketPriceData
                });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, new { error = "Failed to fetch data.", details = ex.Message });
            }
        }

        [HttpGet("{ticker}/options")]
        public async Task<IActionResult> GetStockOptions(string ticker, [FromQuery] int expirationMin, [FromQuery] int expirationMax, [FromQuery] double? deltaMin, [FromQuery] double? deltaMax, [FromQuery] string optionType = "BOTH", [FromQuery] double? minPremium = 0)
        {
            string optionTypeUrlParameter = optionType.ToLower() == "call" ? "?type=calls" : optionType.ToLower() == "put" ? "?type=puts" : "";
            List<StockOption> stockOptions = new List<StockOption>();

            try
            {
                var datesHtmlResponse = await _yahooScrapeService.FetchHtml($"/quote/{ticker}/options");
                var datesHtmlDoc = new HtmlDocument();
                datesHtmlDoc.LoadHtml(datesHtmlResponse);

                var dateNodes = datesHtmlDoc.DocumentNode.SelectNodes("//div[contains(@class, 'yf-1hdw734') and @role='option' and @tabindex='-1' and starts-with(@data-value, '174')]");
                var dateValues = dateNodes.Select(node => node.GetAttributeValue("data-value", "N/A")).ToList().Select(value => long.Parse(value)).ToList();

                //Get all expiration dates for that stock
                var validDates = _stockData.FilterTimestamptsByRange(dateValues, expirationMin, expirationMax);


                //Fetch stock options for each date
                foreach (var date in validDates)
                {
                    var fetchStockOptionsURL = $"/quote/{ticker}/options?date={date}&{optionTypeUrlParameter}";
                    var stockOptionsHtmlResponse = await _yahooScrapeService.FetchHtml(fetchStockOptionsURL);

                    var stockOptionsHtmlDoc = new HtmlDocument();
                    stockOptionsHtmlDoc.LoadHtml(stockOptionsHtmlResponse);

                    // First table are calls, second are puts
                    var stockOptionsTables = stockOptionsHtmlDoc.DocumentNode.SelectNodes("//div[contains(@class, 'tableContainer')]//table");

                    if (stockOptionsTables == null)
                    {
                        return NotFound(new { error = "Options data not found." });
                    }

                    if (optionType.ToLower() == "call")
                    {
                        _stockData.ProccessStockOptionsTable(stockOptionsTables[0], stockOptions, "call", minPremium, _stockData.UnixTimestampToDateString(date));
                    }
                    else if (optionType.ToLower() == "put")
                    {
                        _stockData.ProccessStockOptionsTable(stockOptionsTables[1], stockOptions, "put", minPremium, _stockData.UnixTimestampToDateString(date));
                    }
                    else
                    {
                        _stockData.ProccessStockOptionsTable(stockOptionsTables[0], stockOptions, "call", minPremium, _stockData.UnixTimestampToDateString(date));
                        _stockData.ProccessStockOptionsTable(stockOptionsTables[1], stockOptions, "put", minPremium, _stockData.UnixTimestampToDateString(date));
                    }
                }

                var alphaApiOptionsJson = await _alphaVintageApiService.GetOptionsData($"/query?function=HISTORICAL_OPTIONS&symbol={ticker}");
                List<AlphaStockOptions> alphaApiOptions = JsonSerializer.Deserialize<AlphaApiResponse>(alphaApiOptionsJson).data;

                foreach (var option in stockOptions.ToList())
                {
                    var matchingOption = alphaApiOptions.FirstOrDefault(opt => opt.contractID == option.contractName);

                    if (matchingOption != null)
                    {
                        double convertedDelta = double.Parse(matchingOption.delta, CultureInfo.InvariantCulture) / 100000;
                        option.delta = convertedDelta.ToString();

                        if (convertedDelta < deltaMin || convertedDelta > deltaMax)
                        {
                            stockOptions.Remove(option);
                        }
                    }
                }
                List<StockOption> allOptions = stockOptions;

                return Ok(new { ticker, allOptions });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, new { error = "Failed to fetch data.", details = ex.Message });
            }
        }

        [HttpGet("{ticker}/history")]
        public async Task<IActionResult> GetHistoricalData(string ticker)
        {
            var endDate = DateTimeOffset.UtcNow.ToUnixTimeSeconds(); // Current timestamp (now)
            var startDate = DateTimeOffset.UtcNow.AddMonths(-6).ToUnixTimeSeconds(); //6 months ago timestamp

            var queryURL = $"/quote/{ticker}/history?period1={startDate}&period2={endDate}";

            try
            {
                var htmlResponse = await _yahooScrapeService.FetchHtml(queryURL);
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(htmlResponse);

                var tableNode = htmlDoc.DocumentNode.SelectSingleNode("//table[contains(@class, 'yf-1jecxey')]");

                if (tableNode == null)
                {
                    return NotFound(new { error = "Historical data not found." });
                }

                var rows = tableNode.SelectNodes(".//tr");

                var historicalData = new List<object>();

                foreach (var row in rows)
                {
                    if (row.Descendants("th").Any()) continue;

                    var columns = row.SelectNodes("td");
                    if (columns == null || columns.Count < 7) continue;

                    var date = columns[0].InnerText.Trim();
                    var openPrice = columns[1].InnerText.Trim();
                    var highPrice = columns[2].InnerText.Trim();
                    var lowPrice = columns[3].InnerText.Trim();

                    historicalData.Add(new { date, openPrice, highPrice, lowPrice });
                }

                return Ok(new { ticker, historicalData });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, new { error = "Failed to fetch data.", details = ex.Message });
            }
        }
    }
}
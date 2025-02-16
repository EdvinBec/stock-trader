using HtmlAgilityPack;
using api.models;
using System.Text.RegularExpressions;
using System.Globalization;

namespace api.utility
{
    public class StockData
    {
        public StockPrice? GetStockPriceDetails(HtmlDocument htmlDoc, string[] priceTestIds, string[] changeTestIds, string[] percentTestIds, string dateSelectQuery)
        {
            var priceNode = FindFirstValidNode(htmlDoc, priceTestIds);
            var changeNode = FindFirstValidNode(htmlDoc, changeTestIds);
            var percentNode = FindFirstValidNode(htmlDoc, percentTestIds);
            var dateNode = htmlDoc.DocumentNode.SelectSingleNode(dateSelectQuery);

            if (priceNode == null || changeNode == null || percentNode == null || dateNode == null)
            {
                return null;
            }

            return new StockPrice
            {
                date = dateNode.InnerText.Trim(),
                price = priceNode.InnerText.Trim(),
                numberIncrease = FormatPriceChange(changeNode.InnerText.Trim()),
                percentageIncrease = ParsePercentage(percentNode.InnerText.Trim())
            };
        }

        private HtmlNode? FindFirstValidNode(HtmlDocument htmlDoc, string[] testIds)
        {
            foreach (var testId in testIds)
            {
                var node = htmlDoc.DocumentNode.SelectSingleNode($"//span[@data-testid='{testId}']");
                if (node != null)
                {
                    return node;
                }
            }
            return null;
        }

        private string FormatPriceChange(string priceChange) => priceChange.StartsWith("+") ? priceChange.Substring(1) : priceChange;

        private string ParsePercentage(string percentage) => Regex.Match(percentage, @"-?\d+(\.\d+)?").Value ?? "0";

        public List<long> FilterTimestamptsByRange(List<long> unixTimestamps, int expirationMin, int expirationMax)
        {
            DateTime today = DateTime.UtcNow.Date;

            DateTime minDate = today.AddDays(expirationMin);
            DateTime maxDate = today.AddDays(expirationMax);

            List<long> filteredTimestamps = unixTimestamps.Where(timestamp =>
            {
                DateTime timestampDate = DateTimeOffset.FromUnixTimeSeconds(timestamp).DateTime;
                return timestampDate >= minDate && timestampDate <= maxDate;
            }).ToList();

            return filteredTimestamps;
        }
        public double ParseNumber(string number)
        {
            if (number.Contains(",") && number.IndexOf(",") > number.IndexOf("."))
            {
                number = number.Replace(".", "");
                number = number.Replace(",", ".");
            }
            else
            {
                number = number.Replace(",", "");
            }

            if (double.TryParse(number, NumberStyles.Any, CultureInfo.InvariantCulture, out double result))
            {
                return result;
            }

            return 0;
        }

        public void ProccessStockOptionsTable(HtmlNode tableNode, List<StockOption> stockOptions, string optionType, double? premiumMin, string expirationDate)
        {
            static int calculateDaysToExpiration(string expirationDate)
            {
                if (DateTime.TryParseExact(expirationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime expiration))
                {
                    TimeSpan timeToExpiration = expiration - DateTime.Today;

                    return timeToExpiration.Days;
                }

                return -1;
            }

            var rows = tableNode.SelectNodes(".//tr");

            if (rows == null)
            {
                throw new Exception("No rows found in the options table.");
            }

            foreach (var row in rows)
            {
                if (row.Descendants("th").Any()) continue;

                var columns = row.SelectNodes("td");

                if (columns == null || columns.Count < 7) continue;

                string contractName = columns[0].InnerText.Trim();
                double strikePrice = ParseNumber(columns[2].InnerText.Trim());
                double premiumPrice = ParseNumber(columns[3].InnerText.Trim());
                var iv = columns[10].InnerText.Trim();

                if (premiumPrice < premiumMin) continue;

                stockOptions.Add(new StockOption
                {
                    contractName = contractName,
                    strikePrice = strikePrice,
                    premium = premiumPrice,
                    optionType = optionType,
                    expirationDate = expirationDate,
                    iv = iv,
                    delta = "N/A",
                    roi = $"{(premiumPrice / strikePrice * (365 / calculateDaysToExpiration(expirationDate))).ToString("F2")}%"
                });
            }

        }

        public string UnixTimestampToDateString(long unixTimestamp)
        {
            DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(unixTimestamp).UtcDateTime;

            return dateTime.ToString("yyyy-MM-dd");
        }
    }
}
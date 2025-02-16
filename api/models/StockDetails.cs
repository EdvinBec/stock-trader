using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class StockDetails
    {
        public string ticker { get; set; } = string.Empty;
        public string stockName { get; set; } = string.Empty;
        public StockPrice closingPrice { get; set; }
        public StockPrice? preMarketPrice { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class StockPrice
    {
        public string date { get; set; } = string.Empty;
        public string price { get; set; } = string.Empty;
        public string numberIncrease { get; set; } = string.Empty;
        public string percentageIncrease { get; set; } = string.Empty;
    }
}
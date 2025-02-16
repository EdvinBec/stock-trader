using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class AlphaStockOptions
    {
        public string contractID { get; set; } = string.Empty;
        public string symbol { get; set; } = string.Empty;
        public string expiration { get; set; } = string.Empty;
        public string strike { get; set; } = string.Empty;
        public string type { get; set; } = string.Empty;
        public string last { get; set; } = string.Empty;
        public string mark { get; set; } = string.Empty;
        public string bid { get; set; } = string.Empty;
        public string bidSize { get; set; } = string.Empty;
        public string ask { get; set; } = string.Empty;
        public string askSize { get; set; } = string.Empty;
        public string volume { get; set; } = string.Empty;
        public string openInterest { get; set; } = string.Empty;
        public string date { get; set; } = string.Empty;
        public string impliedVolatility { get; set; } = string.Empty;
        public string delta { get; set; } = string.Empty;
        public string gamma { get; set; } = string.Empty;
        public string theta { get; set; } = string.Empty;
        public string vega { get; set; } = string.Empty;
        public string rho { get; set; } = string.Empty;
    }
}
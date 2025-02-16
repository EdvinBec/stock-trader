using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class StockOption
    {
        public string contractName { get; set; } = string.Empty;
        public string optionType { get; set; } = string.Empty;
        public string expirationDate { get; set; } = string.Empty;
        public double strikePrice { get; set; }
        public double premium { get; set; }
        public string? iv { get; set; }
        public string? delta { get; set; }
        public string? roi { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class AlphaApiResponse
    {
        public string endpoint { get; set; } = string.Empty;
        public string message { get; set; } = string.Empty;
        public List<AlphaStockOptions> data { get; set; } = new List<AlphaStockOptions>();
    }
}
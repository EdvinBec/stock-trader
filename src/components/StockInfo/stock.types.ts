export type StockPriceType = {
  price: number;
  numberIncrease: number;
  percentageIncrease: number;
};

export type BasicStockInfo = {
  ticker: string;
  stockName: string;
  closingPrice: StockPriceType;
  preMarketPrice: StockPriceType;
};

export type StockHistoricalPrices = {
  date: string;
  openPrice: string;
  highPriec: string;
  lowPrice: string;
};

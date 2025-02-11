export type StockPriceType = {
  price: number;
  numberIncrease: number;
  percentageIncrease: number;
};

export type BasicStockInfo = {
  abbreviation: string;
  fullName: string;
  closingPrice: StockPriceType;
  preMarketPrice: StockPriceType;
};

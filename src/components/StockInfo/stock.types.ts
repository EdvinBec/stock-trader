export type StockPriceType = {
  price: number;
  numberIncrease: number;
  percentageIncrease: number;
  date: string;
};

export type BasicStockInfo = {
  ticker: string;
  stockName: string;
  closingPrice: StockPriceType;
  preMarketPrice: StockPriceType | null;
};

export type StockHistoricalPrices = {
  date: string;
  openPrice: string;
  highPriec: string;
  lowPrice: string;
};

export type StockOption = {
  contractName: string;
  optionType: "call" | "put";
  expirationDate: string;
  strikePrice: number;
  premium: number;
  iv: string;
  delta: string;
  roi: string;
};

export type OptionFilterCriteria = {
  expirationMin: number;
  expirationMax: number;
  deltaMin: number;
  deltaMax: number;
  premiumMin: number;
  optionType: "call" | "put" | "both";
};

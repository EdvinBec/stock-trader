import Tag from "../Tag";
import { Separator } from "../ui/separator";
import { BasicStockInfo } from "./stock.types";
import StockPrice from "./StockPrice";

type Props = {
  className?: string;
};

const StockHeader = ({
  className,
  ticker,
  closingPrice,
  stockName,
  preMarketPrice,
}: BasicStockInfo & Props) => {
  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-2 md:items-center md:gap-4 md:flex-row">
        <Tag label={ticker} />
        <h1 className="font-medium uppercase text-4xl">{stockName}</h1>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col items-start gap-6 md:flex-row md:gap-12 md:items-center">
        <div>
          <StockPrice
            numberIncrease={closingPrice.numberIncrease}
            percentageIncrease={closingPrice.percentageIncrease}
            price={closingPrice.price}
            date={closingPrice.date}
          />
          <label className="text-sm">{closingPrice?.date}</label>
        </div>
        <div>
          {preMarketPrice && (
            <StockPrice
              numberIncrease={preMarketPrice.numberIncrease}
              percentageIncrease={preMarketPrice.percentageIncrease}
              price={preMarketPrice.price}
              date={preMarketPrice.date}
            />
          )}
          <label className="text-sm">{preMarketPrice?.date}</label>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;

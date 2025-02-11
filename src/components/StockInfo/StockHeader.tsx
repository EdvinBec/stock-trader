import Tag from "../Tag";
import { Separator } from "../ui/separator";
import { BasicStockInfo } from "./stock.types";
import StockPrice from "./StockPrice";

const StockHeader = ({
  abbreviation,
  closingPrice,
  fullName,
  preMarketPrice,
}: BasicStockInfo) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-start gap-1 md:items-center md:gap-4 md:flex-row  mt-1">
        <Tag label={abbreviation} />
        <h1 className="font-medium uppercase text-2xl md:text-4xl">
          {fullName}
        </h1>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col items-start gap-4 md:flex-row md:gap-12 md:items-center">
        <div>
          <StockPrice
            numberIncrease={closingPrice.numberIncrease}
            percentageIncrease={closingPrice.percentageIncrease}
            price={closingPrice.price}
          />
          <label className="text-xs">
            At close: February 10 at 4:00:01 PM EST
          </label>{" "}
          {/*TO:DO change with real values */}
        </div>
        <div>
          <StockPrice
            numberIncrease={preMarketPrice.numberIncrease}
            percentageIncrease={preMarketPrice.percentageIncrease}
            price={preMarketPrice.price}
          />
          <label className="text-xs">
            Pre-Market: February 10 at 4:00:01 PM EST
          </label>{" "}
          {/*TO:DO change with real values */}
        </div>
      </div>
    </div>
  );
};

export default StockHeader;

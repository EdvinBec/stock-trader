import Tag from "../Tag";
import { Separator } from "../ui/separator";
import { BasicStockInfo } from "./stock.types";
import StockPrice from "./StockPrice";

type Props = {
  className?: string;
};

const StockHeader = ({
  className,
  abbreviation,
  closingPrice,
  fullName,
  preMarketPrice,
}: BasicStockInfo & Props) => {
  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-2 md:items-center md:gap-4 md:flex-row">
        <Tag label={abbreviation} />
        <h1 className="font-medium uppercase text-4xl">{fullName}</h1>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col items-start gap-6 md:flex-row md:gap-12 md:items-center">
        <div>
          <StockPrice
            numberIncrease={closingPrice.numberIncrease}
            percentageIncrease={closingPrice.percentageIncrease}
            price={closingPrice.price}
          />
          <label className="text-sm">
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
          <label className="text-sm">
            Pre-Market: February 10 at 4:00:01 PM EST
          </label>{" "}
          {/*TO:DO change with real values */}
        </div>
      </div>
    </div>
  );
};

export default StockHeader;

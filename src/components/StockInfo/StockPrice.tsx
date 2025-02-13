import { StockPriceType } from "./stock.types";

type Props = {
  atClose?: boolean;
};

const StockPrice = ({
  numberIncrease,
  percentageIncrease,
  price,
}: StockPriceType & Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-black">{price}</h2>
        <h3
          className={`text-xl font-bold ${
            numberIncrease >= 0 ? "text-[#008000]" : "text-[#df2935]"
          } mt-1`}
        >
          {numberIncrease >= 0 && "+"}
          {numberIncrease} {numberIncrease >= 0 && "+"}({percentageIncrease}%)
        </h3>
      </div>
    </div>
  );
};

export default StockPrice;

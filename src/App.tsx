import "./App.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import OptionsTable from "./components/StockInfo/OptionsTable";
import PriceLineChart from "./components/StockInfo/PriceLineChart";
import { BasicStockInfo } from "./components/StockInfo/stock.types";
import StockHeader from "./components/StockInfo/StockHeader";

function App() {
  const mockStock: BasicStockInfo = {
    abbreviation: "MSFT",
    fullName: "Microsoft Corporation",
    closingPrice: {
      price: 412.22,
      numberIncrease: 2.47,
      percentageIncrease: 0.6,
    },
    preMarketPrice: {
      price: 411.0,
      numberIncrease: -1.22,
      percentageIncrease: -0.3,
    },
  };

  return (
    <MaxWidthWrapper>
      <StockHeader
        className="mt-8"
        abbreviation={mockStock.abbreviation}
        fullName={mockStock.fullName}
        closingPrice={mockStock.closingPrice}
        preMarketPrice={mockStock.preMarketPrice}
      />
      <div className="mt-8">
        <PriceLineChart />
      </div>
      <OptionsTable className="mt-8 mb-20" />
    </MaxWidthWrapper>
  );
}

export default App;

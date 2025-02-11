import "./App.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
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
        abbreviation={mockStock.abbreviation}
        fullName={mockStock.fullName}
        closingPrice={mockStock.closingPrice}
        preMarketPrice={mockStock.preMarketPrice}
      />
    </MaxWidthWrapper>
  );
}

export default App;

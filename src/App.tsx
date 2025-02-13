import { useEffect, useState } from "react";
import "./App.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import OptionsTable from "./components/StockInfo/OptionsTable";
import PriceLineChart from "./components/StockInfo/PriceLineChart";
import {
  BasicStockInfo,
  StockHistoricalPrices,
} from "./components/StockInfo/stock.types";
import StockHeader from "./components/StockInfo/StockHeader";
import { Input } from "./components/ui/input";
import axios from "axios";
import { Loader } from "lucide-react";

function App() {
  const [basicStockInfo, setBasicStockInfo] = useState<BasicStockInfo>();
  const [stockHistoricalPrices, setStockHistoricalPrices] =
    useState<StockHistoricalPrices[]>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stockInfoResponse, historicalPricesResponse] = await Promise.all(
          [
            axios.get("https://localhost:7067/api/stock/MSFT"),
            axios.get("https://localhost:7067/api/stock/MSFT/history"),
          ]
        );

        setBasicStockInfo(stockInfoResponse.data);
        setStockHistoricalPrices(historicalPricesResponse.data.historicalData); // Adjust based on your API response structure
        setIsPageLoading(false);
        setIsChartLoading(false);
      } catch (error) {
        console.log(error);
        setIsPageLoading(false);
        setIsChartLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isPageLoading && (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader className={`animate-spin`} />
        </div>
      )}
      {!isPageLoading && (
        <div className="font-inter">
          <MaxWidthWrapper className="py-4 border-b-1 w-full mb-8 ">
            <nav className="font-inter flex justify-between items-center">
              <a href="/">
                <h1 className="font-bold text-2xl text-[#219ebc]">
                  Stock Trader
                </h1>
              </a>
              <Input placeholder="Search for stocks" className="w-[200px]" />
            </nav>
          </MaxWidthWrapper>
          <MaxWidthWrapper>
            <StockHeader
              className="mt-8"
              ticker={basicStockInfo!.ticker}
              stockName={basicStockInfo!.stockName}
              closingPrice={basicStockInfo!.closingPrice}
              preMarketPrice={basicStockInfo!.preMarketPrice}
            />
            <div className="mt-8">
              {!isChartLoading && (
                <PriceLineChart
                  stockHistoricalPrices={stockHistoricalPrices!}
                />
              )}
            </div>
            <OptionsTable className="mt-8 mb-20" />
          </MaxWidthWrapper>
        </div>
      )}
    </>
  );
}

export default App;

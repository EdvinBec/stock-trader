import { useEffect, useState } from "react";
import "./App.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import OptionsTable from "./components/StockInfo/OptionsTable";
import PriceLineChart from "./components/StockInfo/PriceLineChart";
import {
  BasicStockInfo,
  OptionFilterCriteria,
  StockHistoricalPrices,
  StockOption,
} from "./components/StockInfo/stock.types";
import StockHeader from "./components/StockInfo/StockHeader";
import { Input } from "./components/ui/input";
import axios from "axios";
import { Loader } from "lucide-react";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [basicStockInfo, setBasicStockInfo] = useState<BasicStockInfo>();
  const [stockHistoricalPrices, setStockHistoricalPrices] =
    useState<StockHistoricalPrices[]>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [optionsFilter, setOptionsFilter] = useState<OptionFilterCriteria>();
  const [options, setOptions] = useState<StockOption[] | null>(null);
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);

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

  const fetchOptions = async () => {
    try {
      if (!optionsFilter) {
        toast("Missing required option filter criteria");
        console.error("Options filter is not set.");
        return;
      }

      const { expirationMin, expirationMax, optionType, premiumMin } =
        optionsFilter;

      // Validate required fields
      if (
        expirationMin === undefined ||
        expirationMax === undefined ||
        !optionType
      ) {
        toast("Missing required option filter criteria");
        toast("Missing required criteria");
        console.error("Missing required filter criteria:", {
          expirationMin,
          expirationMax,
          optionType,
        });
        return;
      }

      setIsFetchingOptions(true);

      const response = await axios.get(
        `https://localhost:7067/api/stock/MSFT/options?expirationMin=${expirationMin}&expirationMax=${expirationMax}&optionType=${optionType}&minPremium=${
          premiumMin ?? 0
        }` // Default minPremium to 0 if undefined
      );

      setOptions(response.data.allOptions);
    } catch (error) {
      console.error("Error fetching stock options:", error);
    } finally {
      setIsFetchingOptions(false); // Ensure loading state is updated even if there's an error
    }
  };

  return (
    <>
      <Toaster />

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
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8">
              <div className="w-full">
                <div className="mt-8">
                  {!isChartLoading && (
                    <PriceLineChart
                      stockHistoricalPrices={stockHistoricalPrices!}
                    />
                  )}
                </div>
              </div>

              <div className="bg-white border-1 px-8 py-8 space-y-4 max-w-[350px] mt-8 rounded-sm">
                <div className="mb-4">
                  <h2 className="font-bold font-inter text-lg">
                    Stock options criteria
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Enter stock option filters to get the information you need.
                  </p>
                </div>
                <div className="w-full grid grid-cols-5 items-center gap-2">
                  <Label className="col-span-2">Expiration range</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      onChange={(e) => {
                        setOptionsFilter(
                          (prevCriteria) =>
                            ({
                              ...prevCriteria,
                              expirationMin: Number(e.target.value),
                            } as OptionFilterCriteria)
                        );
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onInput={(e: any) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      min={0} // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onInput={(e: any) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                      onChange={(e) => {
                        setOptionsFilter(
                          (prevCriteria) =>
                            ({
                              ...prevCriteria,
                              expirationMax: Number(e.target.value),
                            } as OptionFilterCriteria)
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="w-full grid grid-cols-5 items-center gap-2">
                  <Label className="col-span-2">Premium minimum</Label>
                  <Input
                    className="w-full col-span-3"
                    onChange={(e) => {
                      setOptionsFilter(
                        (prevCriteria) =>
                          ({
                            ...prevCriteria,
                            premiumMin: Number(e.target.value),
                          } as OptionFilterCriteria)
                      );
                    }}
                  />
                </div>
                <div className="fw-full grid grid-cols-5 items-center gap-2">
                  <Label className="col-span-2">Option type</Label>
                  <div className="w-full col-span-3">
                    <Select
                      onValueChange={(e: "CALL" | "BOTH" | "PUT") => {
                        setOptionsFilter(
                          (prevCriteria) =>
                            ({
                              ...prevCriteria,
                              optionType: e.toLowerCase(),
                            } as OptionFilterCriteria)
                        );
                      }}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Option type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CALL">CALL</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="BOTH">BOTH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={fetchOptions}
                  className="w-full mt-4 cursor-pointer rounded-sm"
                >
                  {isFetchingOptions ? (
                    <Loader className="animate-spin" size={12} />
                  ) : (
                    "Get stock options"
                  )}
                </Button>
              </div>
            </div>
            <OptionsTable className="mt-8 mb-20" optionsData={options} />
          </MaxWidthWrapper>
        </div>
      )}
    </>
  );
}

export default App;

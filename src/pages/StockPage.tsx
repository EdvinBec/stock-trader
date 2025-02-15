import { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { OptionFilterCriteria } from "@/components/StockInfo/stock.types";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import StockHeader from "@/components/StockInfo/StockHeader";
import PriceLineChart from "@/components/StockInfo/PriceLineChart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import OptionsTable from "@/components/StockInfo/OptionsTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setOptionsForTab } from "@/redux/features/tabsSlice";

function StockPage() {
  const [optionsFilter, setOptionsFilter] = useState<OptionFilterCriteria>();
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);

  const dispatch = useDispatch();

  const tabs = useSelector((state: RootState) => state.tabs.tabs);
  const activeTabId = useSelector((state: RootState) => state.tabs.activeTabId);
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!activeTab) {
    return (
      <MaxWidthWrapper>
        <div className="w-full py-32 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">No tabs selected</h1>
          <p className="text-sm font-gray-500">
            Please search for stock or select a tab.
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

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
        console.error("Missing required filter criteria:", {
          expirationMin,
          expirationMax,
          optionType,
        });
        return;
      }

      setIsFetchingOptions(true);

      const response = await axios.get(
        `https://localhost:7067/api/stock/${
          activeTab.ticker
        }/options?expirationMin=${expirationMin}&expirationMax=${expirationMax}&optionType=${optionType}&minPremium=${
          premiumMin ?? 0
        }` // Default minPremium to 0 if undefined
      );

      dispatch(
        setOptionsForTab({
          tabId: activeTab.id,
          options: response.data.allOptions,
        })
      );
    } catch (error) {
      console.error("Error fetching stock options:", error);
    } finally {
      setIsFetchingOptions(false); // Ensure loading state is updated even if there's an error
    }
  };

  return (
    <>
      <div className="font-inter">
        <MaxWidthWrapper>
          <StockHeader
            className="mt-4"
            ticker={activeTab.stockDetails.ticker}
            stockName={activeTab.stockDetails.stockName}
            closingPrice={activeTab.stockDetails.closingPrice}
            preMarketPrice={activeTab.stockDetails.preMarketPrice}
          />
          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8">
            <div className="w-full">
              <div className="mt-8">
                <PriceLineChart
                  stockHistoricalPrices={activeTab.stockPrices!}
                />
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
                    min={0}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <OptionsTable
            className="mt-8 mb-20"
            optionsData={activeTab.options}
          />
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default StockPage;

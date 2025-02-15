import { useEffect, useCallback } from "react";
import axios from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import StockHeader from "@/components/StockInfo/StockHeader";
import PriceLineChart from "@/components/StockInfo/PriceLineChart";
import OptionsTable from "@/components/StockInfo/OptionsTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateStockData } from "@/redux/features/tabsSlice";
import OptionsFilterForm from "@/components/OptionsFilterForm";

function StockPage() {
  const dispatch = useDispatch();

  const tabs = useSelector((state: RootState) => state.tabs.tabs);
  const activeTabId = useSelector((state: RootState) => state.tabs.activeTabId);
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const fetchStockData = useCallback(async () => {
    if (!activeTab) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/stock/${activeTab.ticker}`
      );
      dispatch(
        updateStockData({
          tabId: activeTab.id,
          stockDetails: data,
          stockPrices: activeTab.stockPrices,
        })
      );
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (!activeTab) return;
    fetchStockData();
    const intervalId = setInterval(fetchStockData, 15000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!activeTab) {
    return (
      <MaxWidthWrapper>
        <div className="w-full py-32 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">No tabs selected</h1>
          <p className="text-sm text-gray-500">
            Please search for a stock or select a tab.
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <StockHeader {...activeTab.stockDetails} />
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start mt-6 items-center">
        <PriceLineChart stockHistoricalPrices={activeTab.stockPrices} />
        <OptionsFilterForm activeTab={activeTab} />
      </div>
      <OptionsTable className="mt-8 mb-20" optionsData={activeTab.options} />
    </MaxWidthWrapper>
  );
}

export default StockPage;

import { X } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeTab, setActiveTab } from "@/redux/features/tabsSlice";

const Tab = ({
  ticker,
  stockName,
  isActive,
  tabId,
}: {
  ticker: string;
  stockName: string;
  isActive?: boolean;
  tabId: string;
}) => {
  const dispatch = useDispatch();

  const handleRemoveTab = (tabId: string) => {
    dispatch(removeTab(tabId));
  };

  return (
    <div
      className={` px-4 border-1 flex gap-2 items-center shrink-0 hover:opacity-100 transition-all ease-in-out ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
    >
      <div
        onClick={() => dispatch(setActiveTab(tabId))}
        className="flex items-center gap-4 cursor-default h-full py-2"
      >
        <span className={`text-xs ${isActive ? "font-bold" : "font-medium"}`}>
          {ticker}
        </span>
        <span className={`text-xs ${isActive && "font-bold"}`}>
          {stockName}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 cursor-pointer"
        onClick={() => handleRemoveTab(tabId)}
      >
        <X size={12} />
      </Button>
    </div>
  );
};

const TabsRow = () => {
  const tabs = useSelector((state: RootState) => state.tabs.tabs);
  const tabState = useSelector((state: RootState) => state.tabs);

  return (
    <MaxWidthWrapper>
      <div
        className={`flex overflow-x-scroll flex-nowrap ${
          tabs.length < 1 && "hidden"
        }`}
      >
        {tabs.map((item) => {
          return (
            <Tab
              key={item.id}
              ticker={item.ticker}
              stockName={item.stockDetails.stockName}
              tabId={item.id}
              isActive={tabState.activeTabId === item.id}
            />
          );
        })}
      </div>
    </MaxWidthWrapper>
  );
};

export default TabsRow;

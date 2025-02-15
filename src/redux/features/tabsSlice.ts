import {
  BasicStockInfo,
  OptionFilterCriteria,
  StockHistoricalPrices,
  StockOption,
} from "@/components/StockInfo/stock.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TabType = {
  id: string;
  ticker: string;
  stockDetails: BasicStockInfo;
  options: StockOption[] | null;
  stockPrices: StockHistoricalPrices[];
  optionsFilter: OptionFilterCriteria | null;
};

export type TabsState = {
  tabs: TabType[];
  activeTabId: string | null;
};

const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<TabType>) => {
      const newTab = action.payload;
      state.tabs.push(newTab); // Add the new tab to the tabs array
      state.activeTabId = newTab.id; // Set the new tab as active
    },
    removeTab: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);

      // If the removed tab was active, set activeTabId to another available tab
      if (state.activeTabId === action.payload) {
        state.activeTabId = state.tabs.length > 0 ? state.tabs[0].id : null;
      }
    },

    setOptionsForTab: (
      state,
      action: PayloadAction<{ tabId: string; options: StockOption[] | null }>
    ) => {
      const { tabId, options } = action.payload;
      const tab = state.tabs.find((tab) => tab.id === tabId);

      if (tab) {
        tab.options = options; // Update the options for the specific tab
      }
    },

    // Set the active tab by its ID
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },

    updateStockData(
      state,
      action: PayloadAction<{
        tabId: string;
        stockDetails: BasicStockInfo;
        stockPrices: StockHistoricalPrices[];
      }>
    ) {
      const tab = state.tabs.find((tab) => tab.id === action.payload.tabId);
      if (tab) {
        tab.stockDetails = action.payload.stockDetails;
        tab.stockPrices = action.payload.stockPrices;
      }
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  setOptionsForTab,
  updateStockData,
} = tabsSlice.actions;

export default tabsSlice.reducer;

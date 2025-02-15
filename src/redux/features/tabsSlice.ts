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
  tabs: TabType[]; // Array of open tabs
  activeTabId: string | null; // ID of the currently active tab
  status: "idle" | "loading" | "failed"; // Status for async operations
};

// Define the initial value for the slice state
const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
  status: "idle",
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    // Add a new tab
    addTab: (state, action: PayloadAction<TabType>) => {
      const newTab = action.payload;
      state.tabs.push(newTab); // Add the new tab to the tabs array
      state.activeTabId = newTab.id; // Set the new tab as active
    },
    // Remove a tab by its ID
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
  },
});

// Export the generated action creators
export const { addTab, removeTab, setActiveTab, setOptionsForTab } =
  tabsSlice.actions;

// Export the slice reducer for use in the store configuration
export default tabsSlice.reducer;

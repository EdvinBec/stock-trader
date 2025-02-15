import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { tabsSlice } from "./features/tabsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // key to identify the persisted state
  storage, // which storage to use (localStorage in this case)
};

// Create the persisted reducer
const persistedTabsReducer = persistReducer(persistConfig, tabsSlice.reducer);

export const store = configureStore({
  reducer: {
    tabs: persistedTabsReducer,
  },
});

// Persist the store
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { tabsSlice } from "./features/tabsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage for the web

// Persist configuration
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
  // You can add middleware if needed, but the default is generally sufficient
});

// Persist the store
export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Components/ProductLists/productSlice";
import userReducer from "../Components/User/userSlice";
import cartReducer from "../Components/CartItem/cartSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["product"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

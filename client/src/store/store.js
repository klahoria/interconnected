import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import reducer from "./Reducers/Reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

export default store;

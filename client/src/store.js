// store.js
import { createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web
import authReducer from "./authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // State slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// export const persistor = persistStore(store);
// export default store;

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./store";

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
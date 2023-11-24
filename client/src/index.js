import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
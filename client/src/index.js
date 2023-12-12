import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
import { hotjar } from 'react-hotjar';


hotjar.initialize(3786278, 6);

// Identify the user
hotjar.identify('USER_ID', { userProperty: 'value' });

// Add an event
hotjar.event('button-click');

// Update SPA state
hotjar.stateChange('/my/page');

// Check if Hotjar has been initialized before calling its methods
if (hotjar.initialized()) {
  hotjar.identify('USER_ID', { userProperty: 'value' });
}

// INTERCOM

//var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/lu9lx80w';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
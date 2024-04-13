import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideContext } from './Hooks/Context/MainContext';
import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <ProvideContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProvideContext>
  </React.StrictMode>
, document.getElementById('root') 
); 

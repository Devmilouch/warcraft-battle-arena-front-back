import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from './context/GlobalContext';
import { NavbarAndSizeContextProvider } from './context/NavbarAndSizeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/applications/warcraft-battle-arena/">
    <GlobalContextProvider>
    <NavbarAndSizeContextProvider>
      <App />
    </NavbarAndSizeContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);
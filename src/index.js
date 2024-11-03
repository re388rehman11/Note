/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify'; // Import Toastify container
import { FirebaseProvider } from "./context/Firebase";
import { ShopProvider } from './context/ShopContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext'; // Ensure the path is correct

import 'antd/dist/reset.css'; // Import Ant Design styles
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <ShopProvider>
        <FavoritesProvider>
          <CartProvider>

            <App />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
   

          </CartProvider>
          
        </FavoritesProvider>
      </ShopProvider>
    </FirebaseProvider>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/



import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify'; // Import Toastify container
import { FirebaseProvider } from "./context/Firebase";
// Ensure the path is correct
// Import ThemeProvider

import 'antd/dist/reset.css'; // Import Ant Design styles
import App from './App';
import { NoteProvider } from "./NoteList/NoteContext";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <NoteProvider>
        {/* Wrap with ThemeProvider */}
        <App />
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </NoteProvider>
    </FirebaseProvider>
  </React.StrictMode>
);

reportWebVitals();

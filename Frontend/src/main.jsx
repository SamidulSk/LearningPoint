// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import store from "./Redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Remove React.StrictMode to fix double toast notifications
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          // Global toast options
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          // Success toast styling
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          // Error toast styling
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
          // Loading toast styling
          loading: {
            style: {
              background: '#3b82f6',
              color: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);
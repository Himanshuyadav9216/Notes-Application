import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Imports your main app component
import './index.css'; // Imports the global CSS with Tailwind styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
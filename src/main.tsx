import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * Titik Masuk Utama Aplikasi (Main Entry Point)
 * Memuat komponen App ke dalam elemen root DOM.
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

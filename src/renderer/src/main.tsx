import React from 'react';
import { createRoot } from 'react-dom/client';
import 'rsuite/styles/index.less';
import './styles/index.scss';
import App from './components/App/App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

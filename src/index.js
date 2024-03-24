import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <body>
      <h1>PubMed Search</h1>
      <App />
    </body>
  </StrictMode>
);

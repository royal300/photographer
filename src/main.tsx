import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { EnquiryProvider } from './providers/EnquiryProvider';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SmoothScrollProvider>
        <EnquiryProvider>
          <App />
        </EnquiryProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  </StrictMode>,
);

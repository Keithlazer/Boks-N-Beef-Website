import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { monitorPerformance, monitorAssetSizes, monitorAnimationPerformance, monitorMemoryUsage } from './utils/performance';
import { monitorAccessibility, auditAccessibility } from './utils/accessibility';

// Initialize performance monitoring
monitorPerformance();
monitorAssetSizes();
monitorAnimationPerformance();
monitorMemoryUsage();

// Initialize accessibility monitoring
monitorAccessibility();

// Run accessibility audit after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const audit = auditAccessibility();
    console.log('Accessibility Audit:', audit);
  }, 2000);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
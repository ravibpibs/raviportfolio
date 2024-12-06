import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Use createRoot to initialize the root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Register the service worker
registerServiceWorker();

import React from 'react';
import { createRoot } from 'react-dom/client';  // Correct import for React 18
import './index.css';
import App from './App';
import { CharacterProvider } from './CharacterContext'; // Ensure this is correctly pointing to your CharacterContext file
import reportWebVitals from './reportWebVitals';

// Correct way to get the root container to initialize the React root
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);  // Initialize the root correctly using the container

// Render the App component within the CharacterProvider context using the new root API
root.render(
  <React.StrictMode>
    <CharacterProvider>  
      <App />
    </CharacterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import { SettingsProvider } from './context/SettingsContext';

interface AppProps {
  // Add props if needed
}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <SettingsProvider>
        <MainPage />
      </SettingsProvider>
    </div>
  );
};

export default App;
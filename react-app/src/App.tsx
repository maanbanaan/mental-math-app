import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';

interface AppProps {
  // Add props if needed
}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
};

export default App;
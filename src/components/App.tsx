import React from 'react';
import Main from './Main';
import Header from './Header';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;

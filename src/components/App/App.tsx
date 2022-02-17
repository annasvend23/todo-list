import React, { FC } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import PopupMenu from '../Popups/PopupMenu';
import PopupDeleteToDo from '../Popups/PopupDeleteToDo';
import './App.css';

const App: FC = () => {
  return (
    <div className='app'>
      <Header />
      <Main />
      <PopupMenu />
      <PopupDeleteToDo />
    </div>
  );
};

export default App;

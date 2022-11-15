import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';
import LeftPanel from './components/leftPanel/LeftPanel';
import RightPanel from './components/rightPanel/RightPanel';
import Hero from './components/hero/Hero';
import { getMonthObject } from './features/currentMonth/currentMonthSlice';


function App() {

  // console.log(getMonthObject());

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default App;

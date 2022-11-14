import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';
import LeftPanel from './components/leftPanel/LeftPanel';


function App() {


  return (
    <div className="App">
      < Header />
      {/* <SingleDayDetails /> */}

      <LeftPanel />
    </div>
  );
}

export default App;

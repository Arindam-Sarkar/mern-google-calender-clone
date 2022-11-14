import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';
import LeftPanel from './components/leftPanel/LeftPanel';
const monthTable = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']

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

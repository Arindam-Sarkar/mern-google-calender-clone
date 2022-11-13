import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import { getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';

function App() {


  return (
    <div className="App">
      < Header />
      {/* <SingleDayDetails /> */}
    </div>
  );
}

export default App;

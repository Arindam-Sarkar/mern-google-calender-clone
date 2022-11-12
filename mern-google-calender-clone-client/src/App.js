import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import SingleDayDetails from './singeDay/SingleDayDetails';

function App() {
  return (
    <div className="App">
      <SingleDayDetails />
    </div>
  );
}

export default App;

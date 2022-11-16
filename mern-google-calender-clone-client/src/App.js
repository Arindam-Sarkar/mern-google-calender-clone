import React from 'react';
import logo from './logo.svg';
import './App.css';

import { COLOR_0_INDIGO, COLOR_1_GRAY, COLOR_5_PURPLE, getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';
import LeftPanel from './components/leftPanel/LeftPanel';
import RightPanel from './components/rightPanel/RightPanel';
import Hero from './components/hero/Hero';
import { getMonthObject } from './features/currentMonth/currentMonthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TEMP_MEMORY_TESTING_TASKS } from './utilities';
import { updateColorList, changeColorListVisibility, addToTaskList, removeFromTaskList } from '../src//features/tasksList/taskListSlice'

function App() {
  const taskDataList = useSelector((state) => state.taskList.taskDataList)

  const dispatch = useDispatch()
  // console.log(getMonthObject());

  // TEMP_MEMORY_TESTING_TASKS.map(task =>dispatch(addToTaskList(task)))

  // dispatch(removeFromTaskList({ taskId: 570948078779850 }))
  // console.log("taskDataList = ", taskDataList)
  // dispatch(updateColorList({ taskDataList: taskDataList }))

  // dispatch(changeColorListVisibility({ color: COLOR_1_GRAY, visibility: false }))


  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default App;

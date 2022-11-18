import React from 'react';
import logo from './logo.svg';
import './App.css';

import { COLOR_0_INDIGO, COLOR_1_GRAY, COLOR_5_PURPLE, getMonthObjectArray } from './utilities';
import SingleDayDetails from './components/singeDayDetails/SingleDayDetails';
import Header from './components/header/Header';
import LeftPanel from './components/leftPanel/LeftPanel';
import RightPanel from './components/rightPanel/RightPanel';
import Hero from './pages/hero/Hero';
import { getMonthObject } from './features/currentMonth/currentMonthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TEMP_MEMORY_TESTING_TASKS } from './utilities';
import { updateColorList, changeColorListVisibility, addToTaskList, removeFromTaskList } from '../src//features/tasksList/taskListSlice'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';

function App() {
  const taskDataList = useSelector((state) => state.taskList.taskDataList)

  const dispatch = useDispatch()
  // console.log(getMonthObject());

  // dispatch(removeFromTaskList({ taskId: 570948078779850 }))
  // console.log("taskDataList = ", taskDataList)

  // TEMP_MEMORY_TESTING_TASKS.map(task => dispatch(addToTaskList(task)))
  // dispatch(updateColorList({ taskDataList: taskDataList }))
  // dispatch(changeColorListVisibility({ color: COLOR_1_GRAY, visibility: false }))

  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

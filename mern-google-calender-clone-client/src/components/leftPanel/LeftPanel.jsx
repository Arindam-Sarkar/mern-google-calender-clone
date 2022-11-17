import React, { useEffect, useState } from 'react'
import plus from '../../assets/plus.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { moveMonth, setMonth } from '../../features/currentMonth/currentMonthSlice.js'

import { MONTH_TABLE, WEEK_TABLE, TASK_COLOR_TABLE } from '../../utilities'
import SingleDayDetails from '../singeDayDetails/SingleDayDetails'
import { updateColorList, changeColorListVisibility, addToTaskList, removeFromTaskList } from '../../features/tasksList/taskListSlice.js'



const LeftPanel = () => {
  const monthArrayDataSmall = useSelector((state) => state.currentMonth.monthArrayDataSmall)
  const taskDataList = useSelector((state) => state.taskList.taskDataList)
  const taskColorList = useSelector((state) => state.taskList.taskColorList)

  const [selectedDate, setSelectedDate] = useState({})
  const [showSingleDayDetails, setShowSingleDayDetails] = useState({ show: false, dayItem: {}, isEdit: false })
  const [today, setToday] = useState({})
  const dispatch = useDispatch()


  useEffect(() => {
    // Get today's date in an oject
    let dateObj = new Date()

    setToday({
      date: dateObj.getDate(),
      month: dateObj.getMonth(),
      year: dateObj.getFullYear(),
      weekday: dateObj.getDay()
    })

    setSelectedDate({
      date: dateObj.getDate(),
      month: dateObj.getMonth(),
      year: dateObj.getFullYear(),
      weekday: dateObj.getDay()
    })

    // setShowSingleDayDetails(prev => ({
    //   ...prev, show: true, dayItem: {
    //     date: dateObj.getDate(),
    //     month: dateObj.getMonth(),
    //     year: dateObj.getFullYear(),
    //     weekday: dateObj.getDay()
    //   }
    // }))

    console.log(taskDataList);
  }, [])


  // If the taskDataList is changed, then update the color list
  useEffect(() => {
    dispatch(updateColorList({ taskDataList: taskDataList }))
  }, [taskDataList])


  // Change the color visibility, this will be used to in the right section
  const checkMarkHandler = (index, value) => {
    dispatch(changeColorListVisibility({ color: index, visibility: value }))
  }

  const createClickHandler = (e) => {
    e.preventDefault()
    setShowSingleDayDetails({ show: true, dayItem: { ...selectedDate }, isEdit: false })
  }

  const exitShowSingleDayDetailsHandler = () => {
    setShowSingleDayDetails({ show: false, dayItem: {}, isEdit: false })
  }

  const prevMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '-',
      type: "small",
      month: monthArrayDataSmall[0].currentMonth,
      year: monthArrayDataSmall[0].currentYear
    }))
  }

  const nextMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '+',
      type: "small",
      month: monthArrayDataSmall[0].currentMonth,
      year: monthArrayDataSmall[0].currentYear
    }))
  }

  const setSelectedDateHandler = (dayItem) => {
    setSelectedDate(dayItem)
    dispatch(setMonth({ month: dayItem.month, year: dayItem.year }))
  }

  return (
    <div className='m-0 p-0 w-[20%] h-[93vh] bg-[white] border-gray-300 
    border-r-2 z-40 flex flex-col justify-start items-center'>

      {((showSingleDayDetails.show) === true) &&
        <div className='fixed left-0 right-0 mt-20'>
          <SingleDayDetails
            dayItem={showSingleDayDetails.dayItem}
            isEdit={showSingleDayDetails.isEdit}
            exitHandler={exitShowSingleDayDetailsHandler}
          />
        </div>
      }

      <button className='mt-[20px] w-[140px] h-[50px] border-2 
      flex gap-[5px] justify-center items-center rounded-full shadow-xl bg-white
      shadow-gray-50 hover:shadow-gray-300 active:bg-gray-200'
        onClick={(e) => createClickHandler(e)}>

        <img src={plus} alt="" className='w-[30px] ml-[-20px]' />
        <span>Create</span>
      </button>

      <div className='w-[95%] h-[270px] mt-[20px] flex flex-col'>

        <div className='w-[100%] ml-0 mt-1 flex justify-center items-center '>


          <div className='w-[60%] text-[18px] text-gray-500 font-semibold  text-left '>
            {`${MONTH_TABLE[monthArrayDataSmall[0].currentMonth]} ${monthArrayDataSmall[0].currentYear}`}
          </div>

          <div
            className=' w-[15%] '>
            <IoIosArrowBack
              className=' text-[18px] cursor-pointer text-gray-500'
              onClick={(e) => prevMonthClickHandler(e)} />
          </div>

          <div
            className=' w-[15%] '>
            <IoIosArrowForward
              className=' text-[18px] cursor-pointer text-gray-500'
              onClick={(e) => nextMonthClickHandler(e)}
            />
          </div>

        </div>

        <div className='w-[100%] text-[14px] font-bold  text-gray-700 mt-2 grid grid-cols-7 gap-x-2'>
          {
            WEEK_TABLE.map((weekday, index) => {
              return (
                <div className='' key={index}>{weekday.slice(0, 1)}</div>
              )
            })
          }
        </div>


        <div className='w-[100%] text-[14px] mt-2 grid grid-cols-7 grid-rows-6 gap-x-2 gap-y-3'>
          {
            monthArrayDataSmall.map((dayItem, index) => {
              if ((today.date === dayItem.date) &&
                (today.month === dayItem.month) &&
                (today.year === dayItem.year) &&
                (today.weekday === dayItem.weekday)) {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] text-[white] cursor-pointer 
                    rounded-full bg-blue-500 flex  justify-center items-center font-semibold'
                    onClick={() => setSelectedDateHandler(dayItem)} key={index}>{dayItem.date}</div>
                )
              }
              else if ((selectedDate.date === dayItem.date) &&
                (selectedDate.month === dayItem.month) &&
                (selectedDate.year === dayItem.year) &&
                (selectedDate.weekday === dayItem.weekday)) {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] text-blue-800 cursor-pointer 
                  rounded-full bg-blue-200 flex  justify-center items-center font-bold '
                    onClick={() => setSelectedDateHandler(dayItem)} key={index}>{dayItem.date}</div>
                )
              }
              else {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] cursor-pointer rounded-full 
                    flex  justify-center items-center'
                    onClick={() => setSelectedDateHandler(dayItem)} key={index}>{dayItem.date}</div>
                )
              }

            })
          }
        </div>
      </div>


      <div className='w-[95%] h-[280px] mt-9 flex flex-col justify-start items-start gap-3'>
        {
          TASK_COLOR_TABLE.map((color, index) => {
            if (taskColorList[index].exists === true) {
              return (
                <div className='w-[100%]  flex justify-start items-center gap-4' key={index}>
                  <input
                    type='checkbox'
                    className='m-0 p-0 ml-6 w-[20px] h-[20px]  cursor-pointer 
                    focus:outline-transparent focus:outline-0 focus:outline-offset-0'
                    defaultChecked={true}
                    onChange={e => checkMarkHandler(index, e.target.checked)}

                  />

                  <div className={`w-[60%] h-[20px] bg-${color}-500 border-2 rounded-md`}></div>
                </div>
              )
            }
          })

        }





      </div>

    </div >
  )
}

export default LeftPanel
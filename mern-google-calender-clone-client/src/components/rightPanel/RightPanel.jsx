import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moveMonth } from '../../features/currentMonth/currentMonthSlice.js'
import { MONTH_TABLE, TASK_COLOR_TABLE, WEEK_TABLE } from '../../utilities'
import SingleDayDetails from '../singeDayDetails/SingleDayDetails.jsx'
import SingleDay from '../singleDay/SingleDay.jsx'


const RightPanel = () => {
  const monthArrayData = useSelector((state) => state.currentMonth.monthArrayData)
  const taskDataList = useSelector((state) => state.taskList.taskDataList)
  const taskColorList = useSelector((state) => state.taskList.taskColorList)

  const [today, setToday] = useState({})
  const [selectedDate, setSelectedDate] = useState({})

  const [dayTask, setDayTask] = useState({
    edit: false,
    showDayTask: true,
    dayTaskData: {}
  })

  let itemCount = 0

  useEffect(() => {
    // Get today's date in an oject
    let dateObj = new Date()

    setToday({
      date: dateObj.getDate(),
      month: dateObj.getMonth(),
      year: dateObj.getFullYear(),
      weekday: dateObj.getDay()
    })

    // setSelectedDate({
    //   date: dateObj.getDate(),
    //   month: dateObj.getMonth(),
    //   year: dateObj.getFullYear(),
    //   weekday: dateObj.getDay()
    // })

    // setShowSingleDayDetails(prev => ({
    //   ...prev, show: true, dayItem: {
    //     date: dateObj.getDate(),
    //     month: dateObj.getMonth(),
    //     year: dateObj.getFullYear(),
    //     weekday: dateObj.getDay()
    //   }
    // }))

    // console.log(taskDataList);
  }, [])

  const enterSingleDayDetailsHandler = (dayItem) => {
    console.log(dayItem);
  }

  const updateSingleDayDetailsHandler = (dayItem) => {

  }

  return (
    <div className='m-0 p-0 w-[80%] h-[93vh] bg-[white] flex flex-col justify-start items-center'>

      <div className='w-[100%]   grid grid-cols-7 gap-x-0'>
        {
          WEEK_TABLE.map((weekday) => {
            return (
              <>
                <div className='m-0 p-0 border-[1px] border-gray-300 border-b-0 
                text-[16px] font-semibold  text-gray-700'>{weekday.slice(0, 3).toUpperCase()}</div>
              </>
            )
          })
        }
      </div>

      <div className='w-[100%] h-[95%] grid grid-cols-7 grid-rows-5'>
        {
          monthArrayData.map((dayItem, index) => {
            itemCount = 0

            return (
              <div className='w-[100%] h-[100%] border-[1px] border-t-0 border-gray-300 
              flex flex-col justify-start items-center' key={index}>
                <div className='w-[100%] h-[20%] mt-2 flex justify-center items-center'>
                  {
                    ((today.date === dayItem.date) &&
                      (today.month === dayItem.month) &&
                      (today.year === dayItem.year) &&
                      (today.weekday === dayItem.weekday)) ?
                      (
                        <div className='w-[28px] h-[28px]  text-[16px]  cursor-pointer rounded-full
                         bg-blue-500 text-[white] font-semibold'
                          onClick={() => enterSingleDayDetailsHandler(dayItem)} >{dayItem.date}</div>
                      ) :
                      (
                        <div className='w-[28px] h-[28px] text-[16px] cursor-pointer rounded-full'
                          onClick={() => enterSingleDayDetailsHandler(dayItem)} >{dayItem.date}</div>
                      )
                  }
                </div>

                <div className='w-[100%] h-[80%] mt-3 flex flex-col justify-start items-center gap-[9px]'>
                  {
                    taskDataList.map((taskitem, index) => {
                      // console.log("today = ", today)
                      // console.log("taskitem.taskDate = ", taskitem.taskDate)

                      if (
                        (taskitem.taskDate.date === dayItem.date) &&
                        (taskitem.taskDate.month === dayItem.month) &&
                        (taskitem.taskDate.year === dayItem.year) &&
                        (taskitem.taskDate.weekday === dayItem.weekday) &&
                        (taskColorList[taskitem.taskColor].visibility === true)
                      ) {
                        itemCount++
                        if (itemCount <= 2) {
                          return (
                            <div className={`w-[80%] h-[23px]
                             bg-${TASK_COLOR_TABLE[taskitem.taskColor]}-500 border-2 rounded-md
                             flex justify-start items-center cursor-pointer text-[white] pl-2`}>
                              {taskitem.taskTitle}
                            </div>
                          )
                        }
                        else if (itemCount === 3) {
                          return (
                            <div className={`w-[80%] h-[23px]
                             bg-${TASK_COLOR_TABLE[taskitem.taskColor]}-500 border-2 rounded-md
                             flex justify-center items-center cursor-pointer text-[white]`}>
                              <div className=''>Other Items ...</div>
                            </div>
                          )
                        }
                      }

                    })

                  }
                </div>
              </div>
            )
          })
        }
      </div>



    </div>
  )
}

export default RightPanel



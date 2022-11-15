import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moveMonth } from '../../features/currentMonth/currentMonthSlice.js'
import { MONTH_TABLE, WEEK_TABLE } from '../../utilities'
import SingleDayDetails from '../singeDayDetails/SingleDayDetails.jsx'
import SingleDay from '../singleDay/SingleDay.jsx'


const RightPanel = () => {
  const monthArrayData = useSelector((state) => state.currentMonth.monthArrayData)
  const [selectedDate, setSelectedDate] = useState({})
  const [dayTask, setDayTask] = useState({
    edit: false,
    showDayTask: true,
    dayTaskData: {}
  })


  let thisDate = new Date().getDate()
  let thisMonth = new Date().getMonth()
  let thisYear = new Date().getFullYear()

  // <SingleDayDetails monthItem={monthItem} />

  const enterSingleDayDetailsHandler = () => {

  }

  const editSingleDayDetailsHandler = () => {

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
          monthArrayData.map((monthItem) => {
            return (
              <div className='w-[100%] h-[100%] border-[1px] border-t-0 border-gray-300 
              flex flex-col justify-start items-center'>
                <div className='w-[100%] h-[20%] mt-2'>

                </div>

                <div className='w-[100%] h-[80%] cursor-pointer'>

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



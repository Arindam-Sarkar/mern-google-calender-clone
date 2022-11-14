import React, { useEffect, useState } from 'react'
import plus from '../../assets/plus.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { moveMonth } from '../../features/currentMonth/currentMonthSlice.js'
import { MONTH_TABLE, WEEK_TABLE } from '../../utilities'


const LeftPanel = () => {
  const monthArrayData = useSelector((state) => state.currentMonth.monthArrayData)
  const [selectedDate, setSelectedDate] = useState({})

  const dispatch = useDispatch()

  let thisDate = new Date().getDate()
  let thisMonth = new Date().getMonth()
  let thisYear = new Date().getFullYear()

  // useEffect(() => {
  //   console.log("monthArrayData =", monthArrayData)
  // }, [monthArrayData])

  const createClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '+',
      month: monthArrayData[0].month,
      year: monthArrayData[0].year
    }))
  }

  const nextMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '+',
      month: monthArrayData[0].month,
      year: monthArrayData[0].year
    }))
  }

  const prevMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '-',
      month: monthArrayData[0].month,
      year: monthArrayData[0].year
    }))
  }

  return (
    <div className='m-0 p-0 w-[16.8vw] h-[93vh] bg-[white] border-gray-300 
    border-r-2 z-40 flex flex-col justify-start items-center'>

      <button className='mt-[20px] w-[140px] h-[50px] border-2 
      flex gap-[5px] justify-center items-center rounded-full shadow-xl bg-white
       shadow-gray-50 hover:shadow-gray-300 active:bg-gray-200'
        onClick={(e) => createClickHandler(e)}>

        <img src={plus} alt="" className='w-[30px] ml-[-20px]' />
        <span>Create</span>
      </button>

      <div className='w-[95%] h-[270px] mt-[20px] border-gray-400 
      border-2 flex flex-col'>

        <div className='w-[100%] ml-0 mt-1 flex justify-center items-center '>


          <div className='w-[60%] text-[18px] text-gray-500 font-semibold  text-left '>
            {`${MONTH_TABLE[monthArrayData[0].month]} ${monthArrayData[0].year}`}
          </div>


          <div
            className=' w-[15%] '>
            <IoIosArrowBack
              className=' text-[18px] cursor-pointer text-gray-500'
              onClick={(e) => prevMonthClickHandler(e)}
            />
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
            WEEK_TABLE.map((weekday) => {
              return (
                <>
                  <div className=''>{weekday.slice(0, 1)}</div>
                </>
              )
            })
          }
        </div>


        <div className='w-[100%] text-[14px] mt-2 grid grid-cols-7 grid-rows-6 gap-x-2 gap-y-3'>
          {
            monthArrayData.map((monthItem) => {

              if ((thisDate === monthItem.date) &&
                (thisMonth === monthItem.month) &&
                (thisYear === monthItem.year)) {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] text-[white] cursor-pointer 
                    rounded-full bg-blue-500 flex  justify-center items-center '
                    onClick={() => setSelectedDate(monthItem)}>{monthItem.date}</div>
                )
              }
              else if ((selectedDate.date === monthItem.date) &&
                (selectedDate.month === monthItem.month) &&
                (selectedDate.year === monthItem.year)) {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] text-blue-800 cursor-pointer 
                  rounded-full bg-blue-200 flex  justify-center items-center font-semibold '
                    onClick={() => setSelectedDate(monthItem)}>{monthItem.date}</div>
                )
              }
              else {
                return (
                  <div className='w-[28px] h-[28px] text-[14px] cursor-pointer rounded-full 
                    flex  justify-center items-center'
                    onClick={() => setSelectedDate(monthItem)}>{monthItem.date}</div>
                )
              }


            })
          }
        </div>

      </div>




    </div >
  )
}

export default LeftPanel
import React, { useEffect } from 'react'
import plus from '../../assets/plus.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { moveMonth } from '../../features/currentMonth/currentMonthSlice.js'


const LeftPanel = () => {
  const monthArrayData = useSelector((state) => state.currentMonth.monthArrayData)
  const dispatch = useDispatch()


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

  return (
    <div className='m-0 p-0 w-[16.8vw] h-[93vh] bg-[white] border-gray-300 
    border-r-2 z-40 flex flex-col justify-start items-center'>

      <button className='mt-[20px] w-[140px] h-[50px] border-2 
      flex gap-[5px] justify-center items-center rounded-full shadow-xl bg-white
       shadow-gray-50 hover:shadow-gray-300 active:bg-gray-200'
        onClick={(e) => createClickHandler(e)}
      >

        <img src={plus} alt="" className='w-[30px] ml-[-20px]' />
        <span>Create</span>
      </button>

      <div className='w-[100%] h-[280px] mt-[30px] border-gray-400 
      border-2 flex flex-col'>

        <div className='mt-1 flex justify-evenly items-center '>
          <div className='text-[18px]  text-gray-500 font-semibold'>November 2022</div>
          <IoIosArrowBack className='ml-5 text-[18px] cursor-pointer text-gray-600' />
          <IoIosArrowForward className='ml-3 text-[18px] cursor-pointer text-gray-600' />
        </div>
      </div>

    </div >
  )
}

export default LeftPanel
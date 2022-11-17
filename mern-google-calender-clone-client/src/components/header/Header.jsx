import React from 'react'
import logo from '../../assets/logo.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { moveMonth, setMonth } from '../../features/currentMonth/currentMonthSlice'
import { MONTH_TABLE } from '../../utilities'

const Header = () => {
  const monthArrayDataMain = useSelector((state) => state.currentMonth.monthArrayDataMain)

  const dispatch = useDispatch()

  const todayClickHandler = (e) => {
    e.preventDefault()

    let month = new Date().getMonth()
    let year = new Date().getFullYear()

    dispatch(setMonth({ month, year }))
  }

  const prevMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '-',
      type: "main",
      month: monthArrayDataMain[0].currentMonth,
      year: monthArrayDataMain[0].currentYear
    }))
  }

  const nextMonthClickHandler = (e) => {
    e.preventDefault()

    dispatch(moveMonth({
      operation: '+',
      type: "main",
      month: monthArrayDataMain[0].currentMonth,
      year: monthArrayDataMain[0].currentYear
    }))
  }

  return (
    <div className='w-[100vw] h-[7vh] m-0 p-0 bg-[white] border-gray-300
    border-b-2 flex gap-4 justify-start items-center text-2xl z-40'>

      <img src={logo}
        alt=""
        className='ml-[10px] w-[50px]'
      />

      <div className=' text-gray-500'>Calender</div>

      <button className='ml-[50px] text-[1.25rem] text-gray-600 bg-white border-2 w-[100px] h-[35px] 
      text-center rounded-l hover:bg-gray-100 active:bg-gray-200'
        onClick={(e) => todayClickHandler(e)}
      >Today</button>

      <IoIosArrowBack
        className='ml-5 cursor-pointer text-gray-600'
        onClick={(e) => prevMonthClickHandler(e)} />

      <IoIosArrowForward
        className='ml-3 cursor-pointer text-gray-600'
        onClick={(e) => nextMonthClickHandler(e)} />

      <div className='ml-5 text-gray-500 font-semibold'>
        {`${MONTH_TABLE[monthArrayDataMain[0].currentMonth]} ${monthArrayDataMain[0].currentYear}`}
      </div>
    </div>
  )
}

export default Header
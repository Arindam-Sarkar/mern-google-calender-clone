import React from 'react'
import logo from '../../assets/logo.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'



const Header = () => {
  return (
    <div className='w-[100vw] h-[60px] bg-[white] flex gap-4 
    justify-start items-center text-2xl'>

      <img src={logo}
        alt=""
        className='w-[50px]'
      />

      <div className=' text-gray-500'>Calender</div>

      <button className='ml-[50px] text-[1.25rem] text-gray-600 bg-white border-2 w-[100px] h-[35px] 
      text-center rounded-l hover:bg-gray-100 active:bg-gray-200'>Today</button>

      <IoIosArrowBack className='ml-5 cursor-pointer text-gray-600' />

      <IoIosArrowForward className='ml-3 cursor-pointer text-gray-600' />

      <div className='ml-5 text-gray-500 font-semibold'>November 2022</div>
    </div>
  )
}

export default Header
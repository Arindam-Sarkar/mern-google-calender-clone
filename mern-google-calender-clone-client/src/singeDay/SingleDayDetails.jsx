import React, { useState } from 'react'

import { AiOutlineClose, AiOutlineMenu, AiOutlineCheck } from 'react-icons/ai'
import { IoTrashSharp, IoBookmarkOutline } from 'react-icons/io5'

import { MdOutlineWatchLater } from 'react-icons/md'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

const taskColor = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
]


const SingleDayDetails = () => {
  const [singleDayColor, setSingleDayColor] = useState([false, false, false, false, false, false])

  const dayColorClickHandler = (index) => {
    let singleDayColorTmp = singleDayColor.map((elemet, i) => {
      if (index === i) {
        return true
      }
      else {
        return false
      }
    })
    console.log("singleDayColorTmp : ", singleDayColorTmp);
    setSingleDayColor(singleDayColorTmp)
  }

  return (
    <div className='border w-screen h-screen flex  justify-center items-center'>

      <div className='md:w-[40%] md:h-[55%] border-2 border-gray-300 flex flex-col 
      rounded-2xl bg-blue sd:w-[90%] sd:h-[40%] '>



        <div className='w-[100%] md:h-[10%]  rounded-t-2xl bg-gray-400 flex flex-col justify-center align-middle'>
          <div className=' flex flex-row  justify-between ml-7 mr-7'>
            <div>
              <span className='text-[1.5rem] text-gray-100  '> <AiOutlineMenu /></span>
            </div>

            <div className='flex flex-row gap-4'>
              <span className='text-[1.5rem]  text-gray-100 cursor-pointer'><IoTrashSharp /></span>
              <span className='text-[1.5rem] text-gray-100 cursor-pointer'><AiOutlineClose /></span>
            </div>
          </div>
        </div>



        <div>
          <input
            type="text"
            placeholder='Add Title'
            className='w-[80%] mt-7 border-0 border-b-2 ml-[15%] outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 text-[1.5rem]' />
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <MdOutlineWatchLater /> </div>
          <div className='text-gray-900 text-[1.5rem] ml-[12%]'>Wednesday, November 16</div>
        </div>


        <div className='flex w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <HiOutlineMenuAlt3 /> </div>
          <input
            type="text"
            placeholder='Add Title'
            className='w-[80%] mt-7 border-0 border-b-2 ml-[11%] outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 text-[1.5rem]' />
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <IoBookmarkOutline /> </div>
          <div className='flex gap-[10px] justify-center items-center ml-[12%]'>
            {

              taskColor.map((color, index) => {
                let classStr = `w-[30px] h-[30px] bg-${color}-500 rounded-2xl border-2 cursor-pointer flex justify-center items-center`
                return (
                  <span className={classStr} key={index}
                    onClick={() => dayColorClickHandler(index)}>
                    {
                      (singleDayColor[index] === true) &&
                      < AiOutlineCheck
                        className='text-[15px] text-white' />
                    }
                  </span>)
              }
              )
            }
          </div>
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-end items-center'>
          <button className='w-[110px] h-[40px] mr-[5%] rounded bg-blue-400 text-[white]'>Save</button>
        </div>

      </div>

    </div >
  )
}

export default SingleDayDetails
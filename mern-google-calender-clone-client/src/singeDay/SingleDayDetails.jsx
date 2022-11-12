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
  const [singleDayColor, setSingleDayColor] = useState([true, false, false, false, false, false])
  const [singleDayTitle, setSingleDayTitle] = useState("")
  const [singleDayDesc, setSingleDayDesc] = useState("")

  const dayColorClickHandler = (index) => {
    let singleDayColorTmp = singleDayColor.map((elemet, i) => {
      if (index === i) {
        return true
      }
      else {
        return false
      }
    })
    setSingleDayColor(singleDayColorTmp)
  }

  return (
    <div className='border w-screen h-screen flex  justify-center items-center'>

      <div className='md:w-[40%] md:h-[55%] border-2 border-gray-200 flex flex-col rounded-2xl w-[90%] h-[45%] '>

        <div className='w-[100%] md:h-[20%] h-[15%] rounded-t-2xl bg-gray-400 flex flex-col justify-center align-middle'>
          <div className=' flex flex-row  justify-between ml-7 mr-7'>
            <div>
              <span className='text-[1.5rem] text-gray-100'> <AiOutlineMenu /></span>
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
            className='w-[80%] mt-7 border-0 border-b-2 ml-[16%]  outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 md:text-[1.5rem]  text-[1.2rem]'
            onChange={e => setSingleDayTitle(e.target.value)}
          />
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <MdOutlineWatchLater /> </div>
          <div className='text-gray-900 ml-[12%] md:text-[1.5rem]  text-[1.2rem]'>Wednesday, November 16</div>
        </div>


        <div className='flex w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <HiOutlineMenuAlt3 /> </div>
          <input
            type="text"
            placeholder='Add a description'
            className='w-[80%] mt-7 border-0 border-b-2 md:ml-[11%] ml-[9%] outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 md:text-[1.5rem]  text-[1.2rem]'
            onChange={e => setSingleDayDesc(e.target.value)}
          />
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
          <button className='md:w-[110px] md:h-[40px] mr-[5%] rounded bg-blue-400 text-[white]
           w-[90px] h-[35px]'>Save</button>
        </div>

      </div>

    </div >
  )
}

export default SingleDayDetails
import React, { useEffect, useState } from 'react'

import { AiOutlineClose, AiOutlineMenu, AiOutlineCheck } from 'react-icons/ai'
import { IoTrashSharp, IoBookmarkOutline } from 'react-icons/io5'

import { MdOutlineWatchLater } from 'react-icons/md'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

import { MONTH_TABLE, WEEK_TABLE, TASK_COLOR_TABLE } from '../../utilities'
import { addToTaskList, updateToTaskList, removeFromTaskList } from '../../features/tasksList/taskListSlice'
import { useDispatch, useSelector } from 'react-redux'

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios'
import { serverUrl } from '../../serverUrl.js'

const SingleDayDetails = ({ dayItem, isEdit, taskId, exitHandler }) => {
  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const taskDataList = useSelector((state) => state.taskList.taskDataList)

  const [editDatevalue, setEditDateValue] = useState();

  const [taskData, setTaskData] = useState({
    userId: userAuthData._id,
    taskId: 0,
    taskDate: {},
    taskTitle: "",
    taskDesc: "",
    taskColor: 0
  })

  const dispatch = useDispatch()

  const sendTaskDataToServer = async (taskData, isEdit) => {
    try {
      if (isEdit === true) {
        const resp = await axios.put(`${serverUrl}/task/update/${userAuthData._id}`, taskData)
        console.log("sendTaskDataToServer -> resp.data =", resp.data)
      } else {
        const resp = await axios.post(`${serverUrl}/task/create/${userAuthData._id}`, taskData)
        console.log("sendTaskDataToServer -> resp.data =", resp.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const singleDaySaveHandler = (e) => {
    e.preventDefault()

    if (isEdit === true) {

      const { taskDate, ...remaining } = taskData

      const taskDataNew = {
        ...remaining,
        taskDate: {
          date: editDatevalue.date(),
          month: editDatevalue.month(),
          year: editDatevalue.year(),
          weekday: editDatevalue.day(),
          currentMonth: taskDate.currentMonth,
          currentYear: taskDate.currentYear
        }
      }
      // console.log("taskDataNew =", taskDataNew);
      dispatch(updateToTaskList(taskDataNew))
      sendTaskDataToServer(taskDataNew, isEdit)
    } else {
      dispatch(addToTaskList(taskData))
      sendTaskDataToServer(taskData, isEdit)
    }
    exitHandler()
  }

  // "proxy": "http://localhost:8800/api"
  // localhost:8800/api/task/remove/63779acbddaad97d6a441a83
  // localhost:8800/api/task/remove/63779acbddaad97d6a441a83

  // in code
  // {
  //   "userId": "63779acbddaad97d6a441a83",
  //   "taskId": 794618984009383,
  //   "taskDate": {
  //     "date": 16,
  //     "month": 10,
  //     "year": 2022,
  //     "weekday": 3,
  //     "currentMonth": 10,
  //     "currentYear": 2022
  //   },
  //   "taskTitle": "tsk16",
  //   "taskDesc": "tsk16",
  //   "taskColor": 2
  // }

  // in tool
  //   {
  //     "userId": "63779acbddaad97d6a441a83",
  //    "taskId": 794618984009383,
  //    "taskDate": {
  //    "date": 16,
  //    "month": 10,
  //    "year": 2022,
  //    "weekday": 3,
  //    "currentMonth": 10,
  //    "currentYear": 2022
  //    },
  //    "taskTitle": "tsk16",
  //    "taskDesc": "tsk16Desc",
  //    "taskColor": 0
  //  }

  const deleteTaskDataInServer = async (taskData) => {
    const serverObj = { userId: userAuthData._id, ...taskData }
    // console.log("deleteTaskDataInServer -> serverObj =", serverObj);

    // console.log(`/task/remove/${userAuthData._id}`)
    try {
      const resp = await axios.put(`${serverUrl}/task/remove/${userAuthData._id}`, serverObj)
      console.log("resp = ", resp)
    } catch (error) {
      console.log(error)
    }
  }

  const singleDayDeleteHandler = (e) => {
    e.preventDefault()

    // console.log("taskData =", taskData);
    dispatch(removeFromTaskList(taskData))
    deleteTaskDataInServer(taskData)
    exitHandler()
  }

  useEffect(() => {
    if (isEdit === true) {
      // If edit, traverce to that specific task and get it's details,
      // from it's task id
      let taskToEdit = {}

      taskDataList.map(taskItem => {
        if (taskItem.taskId === taskId) {
          taskToEdit = taskItem
        }
      })

      setTaskData(taskToEdit)

      // Configure dayjs for that specific date, so that we can configure
      // editDateValue and use it inside mui component
      const dayObj = dayjs(`${taskToEdit.taskDate.year}-${taskToEdit.taskDate.month + 1}-${taskToEdit.taskDate.date}`)
      setEditDateValue(dayObj)
    } else {
      let taskId = Math.floor((Math.random() * 999999999999999) + 1)
      setTaskData(prev => ({ ...prev, taskDate: dayItem, taskId: taskId }))
    }
  }, [0])

  return (
    <div className='border w-screen h-screen flex  justify-center items-start'>

      <div className='md:w-[40%] md:h-[55%] border-2 border-gray-200 bg-white flex flex-col rounded-2xl w-[90%] h-[45%] '>

        <div className='w-[100%] md:h-[20%] h-[15%] rounded-t-2xl bg-gray-200 flex flex-col justify-center align-middle'>
          <div className=' flex flex-row  justify-between ml-7 mr-7'>

            <div>
              <span className='text-[1.5rem] text-gray-600'> <AiOutlineMenu /></span>
            </div>

            <div className='flex flex-row gap-4'>
              <span className='text-[1.5rem]  text-gray-600 cursor-pointer'>
                <IoTrashSharp onClick={(e) => singleDayDeleteHandler(e)} />
              </span>
              <span className='text-[1.5rem] text-gray-600 cursor-pointer'>
                <AiOutlineClose onClick={() => exitHandler()} />
              </span>
            </div>

          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder='Add Title'
            className='w-[80%] mt-7 border-0 border-b-2 ml-[16%]  outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 md:text-[1.5rem]  text-[1.2rem]'
            value={taskData.taskTitle}
            onChange={e => setTaskData(prev => ({ ...prev, taskTitle: e.target.value }))} />
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <MdOutlineWatchLater /> </div>
          {
            (isEdit === true) ?
              (
                <div className='text-gray-900  ml-[12%] md:text-[1.5rem]  text-[1.2rem]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        value={editDatevalue}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => { setEditDateValue(newValue) }}
                        renderInput={(params) => <TextField {...params} />} />
                    </Stack>
                  </LocalizationProvider>
                </div>
              ) :
              (
                <div className='text-gray-900 ml-[12%] md:text-[1.5rem]  text-[1.2rem]'>
                  {`${WEEK_TABLE[taskData.taskDate.weekday]}, ${MONTH_TABLE[taskData.taskDate.month]} ${taskData.taskDate.date}`}
                </div>
              )
          }

        </div>


        <div className='flex w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <HiOutlineMenuAlt3 /> </div>
          <input
            type="text"
            placeholder='Add a description'
            className='w-[80%] mt-7 border-0 border-b-2 md:ml-[11%] ml-[9%] outline-none 
            border-transparent focus:outline-none focus:ring-0 text-gray-900 md:text-[1.5rem]  text-[1.2rem]'
            value={taskData.taskDesc}
            onChange={e => setTaskData(prev => ({ ...prev, taskDesc: e.target.value }))}
          />
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-start items-center'>
          <div className='text-[1.5rem] text-gray-900 ml-[3%]'> <IoBookmarkOutline /> </div>
          <div className='flex gap-[10px] justify-center items-center ml-[12%]'>
            {
              TASK_COLOR_TABLE.map((color, index) => {
                let classStr = `md:w-[40px] md:h-[40px] w-[30px] h-[30px] bg-${color}-500 rounded-3xl border-2 cursor-pointer flex justify-center items-center`
                return (
                  <span className={classStr} key={index}
                    onClick={e => setTaskData(prev => ({ ...prev, taskColor: index }))}>
                    {
                      (taskData.taskColor === index) &&
                      < AiOutlineCheck className='text-[15px] text-white' />
                    }
                  </span>)
              }
              )
            }
          </div>
        </div>

        <div className='flex  w-[100%] h-[80px] flex-row justify-end items-center'>
          <button className='md:w-[110px] md:h-[40px] mr-[5%] rounded bg-blue-400 hover:bg-blue-600 active:bg-blue-700 text-[white]
           w-[90px] h-[35px]'
            onClick={(e) => singleDaySaveHandler(e)}
          >Save</button>
        </div>

      </div>

    </div >
  )
}

export default SingleDayDetails
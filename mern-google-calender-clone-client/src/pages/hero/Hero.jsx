import React, { useEffect } from 'react'
import LeftPanel from '../../components/leftPanel/LeftPanel'
import RightPanel from '../../components/rightPanel/RightPanel'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../serverUrl'
import { addToTaskList, updateToTaskList } from '../../features/tasksList/taskListSlice'

const Hero = () => {
  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // localhost:8800/api/task/getall/63779acbddaad97d6a441a83

  const fetchDataFromServer = async () => {
    try {
      const resp = await axios.get(`/task/getall/${userAuthData._id}`)
      resp.data?.map((task) => {
        // console.log("resp.data =", resp.data)
        let { taskId, taskDate, taskTitle, taskDesc, taskColor } = task
        // console.log({ taskId, taskDate, taskTitle, taskDesc, taskColor });
        dispatch(addToTaskList({ taskId, taskDate, taskTitle, taskDesc, taskColor }))
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if ((userAuthData?._id !== undefined)) {
      fetchDataFromServer()
    } else {
      navigate('/login')
    }
  }, [userAuthData])

  return (
    <div className='flex'>
      {(userAuthData?._id !== undefined) && (
        <>
          <LeftPanel />
          <RightPanel />
        </>
      )}

    </div>
  )
}

export default Hero
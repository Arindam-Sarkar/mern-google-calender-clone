import React, { useEffect } from 'react'
import LeftPanel from '../../components/leftPanel/LeftPanel'
import RightPanel from '../../components/rightPanel/RightPanel'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const navigate = useNavigate()

  useEffect(() => {
    if ((userAuthData?._id !== undefined)) {

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
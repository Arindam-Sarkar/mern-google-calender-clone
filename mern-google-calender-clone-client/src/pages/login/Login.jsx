import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuthSlice'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './login.css'

const Login = () => {
  const [loginData, setlogindata] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState({ errPresent: false, errMsg: "" })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/user/login/", loginData)
      // Clear error message
      setLoginError({ errPresent: false, errMsg: "" })

      console.log(resp)
      if (resp.data?._id !== undefined) {
        toast("Login Successful")

        // Login Successful, put this user data in redux store
        dispatch(addUserAuthData(resp.data))

        // Navigate to home page
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if ((error.response.data.message?.match('Wrong password or username'))) {
        setLoginError({ errPresent: true, errMsg: "Error - Wrong password or username" })
        toast("Error - Wrong password or username")
      } else {
        setLoginError({ errPresent: true, errMsg: "Error - Something went wrong" })
        toast("Error - Something went wrong")
      }
      window.scrollTo(0, 0)
    }
  }

  // useEffect(() => {
  //   console.log(loginData);
  // }, [loginData])

  return (
    <div className='w-full h-[60vh] mt-[50px] flex flex-col justify-center items-center'>
      <form className='w-[300px] flex flex-col justify-start items-center gap-3'
        onSubmit={(e) => userLoginHandler(e)}>

        <label
          className='self-start ml-[60px] text-[1.2rem] text-[#747474] font-bold'
          htmlFor="email">Email</label>
        <input
          className=' w-[200px] h-8 text-[#747474]
           border-gray-800 border-[0.2px] outline-transparent'
          type="email" name="email" id="email" required
          onChange={(e) => setlogindata((prev) => ({ ...prev, email: e.target.value }))} />

        <label
          className='self-start ml-[60px] text-[1.2rem] text-[#747474] font-bold'
          htmlFor="password">Password</label>
        <input
          className=' w-[200px] h-8 text-[#747474] 
          border-gray-800 border-[0.2px] outline-transparent'
          type="password" name="password" id="password" required
          onChange={(e) => setlogindata((prev) => ({ ...prev, password: e.target.value }))} />

        <div className='mt-[10px]'>
          <button className='w-[150px] h-8 text-[1rem] text-[white] bg-blue-500
          rounded-[10px] font-bold cursor-pointer'>Login</button>
        </div>
      </form>

      <div className='w-full mt-[30px] text-[1rem] cursor-pointer text-blue-900'
        onClick={() => navigate('/signup')}>
        New User? Click Here to Sign-Up.
      </div>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />

    </div >
  )
}

export default Login
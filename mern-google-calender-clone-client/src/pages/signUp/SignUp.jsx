import React, { useEffect } from 'react'
import { useState } from 'react'
// import './signUp.css'


import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuthSlice.js'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let dummyData = {
  username: "u4",
  password: "u4",
  passwordReEnter: "u4",
  addressLine1: "flat no 1,123 street,",
  addressLine2: "near main shop",
  city: "city 1",
  state: "state 1",
  email: "u4@u4.com",
  phone: "1223456789"
}

const SignUp = () => {
  const [regError, setRegError] = useState({ errPresent: false, errMsg: "" })
  const [regData, setRegData] = useState({
    username: "", password: "", passwordReEnter: "",
    addressLine1: "", addressLine2: "",
    city: "", state: "", email: "", phone: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const userSignUpHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/user/register/", regData)
      // Clear error message
      setRegError({ errPresent: false, errMsg: "" })

      if (resp.data?._id !== undefined) {
        // Login Successful, put this user data in redux store
        dispatch(addUserAuthData(resp.data))

        toast("Sign-Up Successful")

        // Navigate to home page
        navigate('/')
      }
    } catch (error) {
      if (error.response.data.message?.match('E11000')) {
        if ((error.response.data.message?.match('email_1 dup'))) {
          setRegError({ errPresent: true, errMsg: "Error - Email already in use" })
          toast("Error - Email already in use")
        } else if ((error.response.data.message?.match('phone_1 dup'))) {
          setRegError({ errPresent: true, errMsg: "Error - Phone already in use" })
          toast("Error - Phone number already in use")
        }
        window.scrollTo(0, 0)
      }
    }
  }


  // useEffect(() => {
  //   setRegData(dummyData)
  // }, [])


  return (
    <div className='w-full h-[60vh] mt-[50px] flex flex-col justify-center items-center'>
      <form className='w-[300px] flex flex-col justify-start items-center gap-3'
        onSubmit={(e) => userSignUpHandler(e)}>


        <label
          className='self-start ml-[60px] text-[1.2rem] text-[#747474] font-bold'
          htmlFor="email">Email </label>
        <input
          className=' w-[200px] h-8 text-[#747474]
          border-gray-800 border-[0.2px] outline-transparent'
          onChange={(e) => setRegData((prev) => ({ ...prev, email: e.target.value }))}
          value={regData.email}
          type="email" name="email" id="email" required />

        <label
          className='self-start ml-[60px] text-[1.2rem] text-[#747474] font-bold'
          htmlFor="password">Password</label>
        <input
          className=' w-[200px] h-8 text-[#747474]
          border-gray-800 border-[0.2px] outline-transparent'
          onChange={(e) => setRegData((prev) => ({ ...prev, password: e.target.value }))}
          value={regData.password}
          type="password" name="password" id="password" required />

        <label
          className='self-start ml-[60px] text-[1.2rem] text-[#747474] font-bold'
          htmlFor="passwordRe">Re-type Password</label>
        <input
          className=' w-[200px] h-8 text-[#747474]
          border-gray-800 border-[0.2px] outline-transparent'
          onChange={(e) => setRegData((prev) => ({ ...prev, passwordReEnter: e.target.value }))}
          value={regData.passwordReEnter}
          type="password" name="passwordRe" id="passwordRe" required />

        <div className='mt-[10px]'>
          <button className='w-[150px] h-8 text-[1rem] text-[white] bg-blue-500
          rounded-[10px] font-bold cursor-pointer' type='submit'>Sign Up</button>
        </div>

        <div className='w-full mt-[30px] text-[1rem]  text-blue-900'>
          Already registered? Click <span
            className='text-[1rem] text-red-600 underline cursor-pointer font-semibold'
            cursor-pointer onClick={() => navigate('/login')}>Here</span> to login.</div>
      </form>

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
    </div>
  )
}

export default SignUp
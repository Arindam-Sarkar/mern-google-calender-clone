import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { moveMonth } from '../../features/currentMonth/currentMonthSlice.js'
import { MONTH_TABLE, WEEK_TABLE } from '../../utilities'


const SingleDay = ({ monthItem }) => {
  const monthArrayData = useSelector((state) => state.currentMonth.monthArrayData)
  const [selectedDate, setSelectedDate] = useState({})

  const dispatch = useDispatch()

  let thisDate = new Date().getDate()
  let thisMonth = new Date().getMonth()
  let thisYear = new Date().getFullYear()


  if ((thisDate === monthItem.date) &&
    (thisMonth === monthItem.month) &&
    (thisYear === monthItem.year)) {

  }

  return (
    <div>
      <div>
        {monthItem.date}
      </div>
      <div>

      </div>
    </div>
  )

}

export default SingleDay
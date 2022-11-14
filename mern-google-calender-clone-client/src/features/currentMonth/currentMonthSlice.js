import { createSlice } from '@reduxjs/toolkit';

const getMonthObject = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
  let firstDayOfMonth = (new Date(year, month, 1)).getDay()

  // Start the first day from sunday
  let startingDate = 0 - firstDayOfMonth

  let monthArray = new Array(35).fill({}).map(() => {
    startingDate++

    return ({
      month: month,
      year: year,
      weekday: new Date(year, month, startingDate).getDay(),
      date: new Date(year, month, startingDate).getDate(),

      // dateObj: new Date(year, month, startingDate)
    })
  })

  return (monthArray)
}

const readLocalStorageMonthObj = (storageName) => {
  const arrayFromLocalStorage = localStorage.getItem(storageName)
  if (arrayFromLocalStorage && arrayFromLocalStorage.length) {
    return (JSON.parse(arrayFromLocalStorage))
  } else {
    let monthArr = getMonthObject()
    return (monthArr)
  }
}

const initialState = {
  monthArrayData: [...readLocalStorageMonthObj('monthArrayData')]
};

export const currentMonthSlice = createSlice({
  name: 'currentMonth',

  initialState,

  reducers: {

    moveMonth: (state, action) => {
      let month = action.payload.month
      let year = action.payload.year

      if (action.payload.operation === "+") {
        month++;
        if (month > 11) {
          month = 0;
          year++
        }
      }
      else if (action.payload.operation === "-") {
        month--;
        if (month < 0) {
          month = 11;
          year--
        }
      }

      // Delete the previous entry from local storage
      localStorage.removeItem('monthArrayData')

      // Get new month array
      const monthArrayDataNew = getMonthObject(month, year)

      // Write it into local storage
      localStorage.setItem('monthArrayData', JSON.stringify(monthArrayDataNew))

      // Write the value into monthArrayData
      state.monthArrayData = [...monthArrayDataNew]


      // console.log("month =", month, "Year =", year)
    },


    setMonth: (state, action) => {
      let month = action.payload.month
      let year = action.payload.year

      // Delete the previous entry from local storage
      localStorage.removeItem('monthArrayData')

      // Get new month array
      const monthArrayDataNew = getMonthObject(month, year)

      // Write it into local storage
      localStorage.setItem('monthArrayData', JSON.stringify(monthArrayDataNew))

      // Write the value into monthArrayData
      state.monthArrayData = [...monthArrayDataNew]

      // console.log("month =", month, "Year =", year)
    },

  }
});

export const { moveMonth, setMonth } = currentMonthSlice.actions
export default currentMonthSlice.reducer
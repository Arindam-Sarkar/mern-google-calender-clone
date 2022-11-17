import { createSlice } from '@reduxjs/toolkit';

export const getMonthObject = (monthIp = new Date().getMonth(), yearIp = new Date().getFullYear()) => {
  let firstDayOfMonth = (new Date(yearIp, monthIp, 1)).getDay()

  // console.log("firstDayOfMonth : ", firstDayOfMonth);
  let startingDate = 0
  // If firstday is not sunday
  if (firstDayOfMonth !== 0) {
    // Start the first day from sunday
    startingDate = 0 - firstDayOfMonth;
  }

  // console.log("monthIp =", monthIp, "yearIp =", yearIp, "startingDate =", startingDate)

  let monthArray = new Array(35).fill({}).map((v, i) => {
    startingDate++
    let dateObj = new Date(yearIp, monthIp, startingDate)

    return ({
      date: dateObj.getDate(),
      month: dateObj.getMonth(),
      year: dateObj.getFullYear(),
      weekday: dateObj.getDay(),

      currentMonth: monthIp,
      currentYear: yearIp
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
  monthArrayDataMain: [...readLocalStorageMonthObj('monthArrayDataMain')],
  monthArrayDataSmall: [...readLocalStorageMonthObj('monthArrayDataSmall')]
};

export const currentMonthSlice = createSlice({
  name: 'currentMonth',

  initialState,

  reducers: {

    moveMonth: (state, action) => {
      let month = action.payload.month
      let year = action.payload.year

      // console.log("month =", month, "year =", year)

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

      if (action.payload.type === "main") {
        // Delete the previous entry from local storage
        localStorage.removeItem('monthArrayDataMain')
        localStorage.removeItem('monthArrayDataSmall')

        // Get new month array
        const monthArrayDataMainNew = getMonthObject(month, year)

        // Write it into local storage
        localStorage.setItem('monthArrayDataMain', JSON.stringify(monthArrayDataMainNew))
        localStorage.setItem('monthArrayDataSmall', JSON.stringify(monthArrayDataMainNew))


        // Write the value into monthArrayDataMain and monthArrayDataSmall
        state.monthArrayDataMain = [...monthArrayDataMainNew]
        state.monthArrayDataSmall = [...monthArrayDataMainNew]
      } else {
        // Delete the previous entry from local storage
        localStorage.removeItem('monthArrayDataSmall')

        // Get new month array
        const monthArrayDataMainNew = getMonthObject(month, year)

        // Write it into local storage
        localStorage.setItem('monthArrayDataSmall', JSON.stringify(monthArrayDataMainNew))

        // Write the value into monthArrayDataSmall
        state.monthArrayDataSmall = [...monthArrayDataMainNew]
      }
    },


    setMonth: (state, action) => {
      let month = action.payload.month
      let year = action.payload.year


      // Delete the previous entry from local storage
      localStorage.removeItem('monthArrayDataMain')
      localStorage.removeItem('monthArrayDataSmall')

      // Get new month array
      const monthArrayDataMainNew = getMonthObject(month, year)

      // Write it into local storage
      localStorage.setItem('monthArrayDataMain', JSON.stringify(monthArrayDataMainNew))
      localStorage.setItem('monthArrayDataSmall', JSON.stringify(monthArrayDataMainNew))

      // Write the value into monthArrayDataMain
      state.monthArrayDataMain = [...monthArrayDataMainNew]
      state.monthArrayDataSmall = [...monthArrayDataMainNew]

      // console.log("month =", month, "Year =", year)
    },

  }
});

export const { moveMonth, setMonth } = currentMonthSlice.actions
export default currentMonthSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const readLocalStorageMonthObj = (storageName) => {
  const arrayFromLocalStorage = localStorage.getItem(storageName)
  if (arrayFromLocalStorage && arrayFromLocalStorage.length) {
    return (JSON.parse(arrayFromLocalStorage))
  } else {
    return ([])
  }
}

const initialState = {
  taskDataList: readLocalStorageMonthObj('taskDataList')
}


const taskListSLice = createSlice({
  name: 'taskList',

  initialState,

  reducers: {
    addToTaskList: (state, action) => {
      console.log("action = ", action.payload)

      // Read local Storage
      let lsRdArray = localStorage.getItem("taskDataList")
      let lsWrArray = new Array()
      if (lsRdArray && lsRdArray.length) {
        let arrTmp = JSON.parse(lsRdArray)

        lsWrArray = [...arrTmp, action.payload]
      } else {
        lsWrArray.push(action.payload)
      }

      // Remove from local storage
      localStorage.removeItem("taskDataList")

      // Write it into local storage 
      localStorage.setItem("taskDataList", JSON.stringify(lsWrArray))

      // Change the state variable
      state.taskDataList = lsWrArray
    },

    removeFromTaskList: (state, action) => {
      console.log("action = ", action.payload)

      // Read local Storage
      let lsRdArray = localStorage.getItem("taskDataList")
      let lsWrArray = new Array()
      if (lsRdArray && lsRdArray.length) {
        let arrTmp = JSON.parse(lsRdArray)
        let arrFiltered = arrTmp.filter(item =>
          item.taskId !== action.payload.taskId)
        lsWrArray = [...arrFiltered, action.payload]
      } else {
        lsWrArray.push(action.payload)
      }

      // Remove from local storage
      localStorage.removeItem("taskDataList")

      // Write it into local storage 
      localStorage.setItem("taskDataList", JSON.stringify(lsWrArray))

      // Change the state variable
      state.taskDataList = lsWrArray
    }
  }

})

export const { addToTaskList, removeFromTaskList } = taskListSLice.actions
export default taskListSLice.reducer
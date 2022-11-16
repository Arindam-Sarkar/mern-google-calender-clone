import { createSlice } from "@reduxjs/toolkit";

const readLocalStorageTaskList = (storageName) => {
  const arrayFromLocalStorage = localStorage.getItem(storageName)
  if (arrayFromLocalStorage && arrayFromLocalStorage.length) {
    return (JSON.parse(arrayFromLocalStorage))
  } else {
    return ([])
  }
}

const readLocalStorageColorList = (storageName) => {
  const arrayFromLocalStorage = localStorage.getItem(storageName)
  if (arrayFromLocalStorage && arrayFromLocalStorage.length) {
    return (JSON.parse(arrayFromLocalStorage))
  } else {
    return ([
      { exists: false, visibility: true },
      { exists: false, visibility: true },
      { exists: false, visibility: true },
      { exists: false, visibility: true },
      { exists: false, visibility: true },
      { exists: false, visibility: true }
    ])
  }
}

const initialState = {
  taskDataList: readLocalStorageTaskList('taskDataList'),
  taskColorList: readLocalStorageColorList('taskColorList')
}

const taskListSLice = createSlice({
  name: 'taskList',

  initialState,

  reducers: {

    updateColorList: (state, action) => {

      console.log("action =", action);

      // Read local Storage
      let rdArray = readLocalStorageColorList("taskColorList")

      // traverse through the incoming taskDataList and find which
      // colours are present, whichever colours are present, set their
      // color list state to {exists: true}
      action.payload.taskDataList.map((taskItem, index) => {
        const { exists, ...remaining } = rdArray[taskItem.taskColor]
        rdArray[taskItem.taskColor] = { exists: true, ...remaining }
      })

      // Write it into local storage 
      localStorage.setItem("taskColorList", JSON.stringify(rdArray))

      state.taskColorList = rdArray
    },

    changeColorListVisibility: (state, action) => {

      // Read local Storage
      let rdArray = readLocalStorageColorList("taskColorList")

      // set that specific color to the respective value
      const modArray = rdArray.map((item, index) => {
        if (action.payload.color === index) {
          const { visibility, ...remaining } = item
          item = { ...remaining, visibility: action.payload.visibility }
          return (item)
        }
        else {
          return (item)
        }
      })


      console.log('modArray =', modArray)
      // Remove from local storage
      localStorage.removeItem("taskColorList")

      // Write it into local storage 
      localStorage.setItem("taskColorList", JSON.stringify(modArray))

      state.taskColorList = modArray
    },

    addToTaskList: (state, action) => {
      console.log("action = ", action.payload)

      // Read local Storage
      let lsRdArray = readLocalStorageTaskList("taskDataList")

      let lsWrArray = new Array()
      if (lsRdArray && lsRdArray.length > 0) {
        lsWrArray = [...lsRdArray, action.payload]
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

      if (action.payload !== undefined && action.payload.taskId) {

        console.log("action.payload.taskId = ", action.payload.taskId)
        // Read local Storage
        let lsRdArray = readLocalStorageTaskList("taskDataList")
        let lsWrArray = new Array()
        if (lsRdArray && lsRdArray.length > 0) {
          let arrFiltered = lsRdArray.filter(item => item.taskId !== action.payload.taskId)
          lsWrArray = [...arrFiltered]
        }

        // Remove from local storage
        localStorage.removeItem("taskDataList")

        // Write it into local storage 
        localStorage.setItem("taskDataList", JSON.stringify(lsWrArray))

        console.log("lsWrArray =", lsWrArray)
        // Change the state variable
        state.taskDataList = lsWrArray
      }
    }
  }

})

export const {
  updateColorList,
  changeColorListVisibility,
  addToTaskList,
  removeFromTaskList } = taskListSLice.actions
export default taskListSLice.reducer
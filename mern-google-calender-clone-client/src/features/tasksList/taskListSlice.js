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
  taskListData: readLocalStorageMonthObj()
}


const taskListSLice = createSlice({
  name: 'taskList',

  initialState,

  reducers: {
    addToTaskList: (state, action) => {
      console.log(action.payload);
    }
  }

})

export const { addToTaskList } = taskListSLice.actions
export default taskListSLice.reducer
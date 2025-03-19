
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/table-user/tableSlice'

export const store = configureStore({
	reducer: {
		todolist: todoReducer,
	},
})

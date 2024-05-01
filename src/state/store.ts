import { configureStore } from "@reduxjs/toolkit"
import correctCodeKeySlice from './correctCodeKey/correctCodeKeySlice'

export const store = configureStore({
	reducer: {
		correctCodeKey: correctCodeKeySlice,
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
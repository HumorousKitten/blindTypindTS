import { configureStore } from "@reduxjs/toolkit"
import correctCodeKeySlice from './correctCodeKey/correctCodeKeySlice'
import simulatorStrAndLevelSlice from './simulatorStrAndLevel/simulatorStrAndLevelSlice'

export const store = configureStore({
	reducer: {
		correctCodeKey: correctCodeKeySlice,
		simulatorStrAndLevel: simulatorStrAndLevelSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
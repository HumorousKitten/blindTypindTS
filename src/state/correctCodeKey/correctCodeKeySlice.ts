import { createSlice } from '@reduxjs/toolkit'

interface ICorrectCodeKeyState {
	correct: boolean | null
	codeKey: string
	currentKey: string
	nextKey: string
}

const initialState: ICorrectCodeKeyState = {
	correct: null,
	codeKey: '',
	currentKey: '',
	nextKey: '',
}

const correctCodeKeySlice = createSlice({
	name: "correctCodeKey",
	initialState,
	reducers: {
		isCorrectCodeKey: (state, {payload}) => {
			state.correct = payload.correct
			state.codeKey = payload.codeKey
			state.currentKey = payload.currentKey
			state.nextKey = payload.nextKey
		}
	}
})
export const {isCorrectCodeKey} = correctCodeKeySlice.actions
export default correctCodeKeySlice.reducer
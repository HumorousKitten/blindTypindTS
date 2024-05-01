import { createSlice } from '@reduxjs/toolkit'

interface ICorrectCodeKeyState {
	correct: boolean | null
	codeKey: string
}

const initialState: ICorrectCodeKeyState = {
	correct: null,
	codeKey: ''
}

const correctCodeKeySlice = createSlice({
	name: "correctCodeKey",
	initialState,
	reducers: {
		isCorrectCodeKey: (state, {payload}) => {
			state.correct = payload.correct
			state.codeKey = payload.codeKey
		}
	}
})
export const {isCorrectCodeKey} = correctCodeKeySlice.actions
export default correctCodeKeySlice.reducer
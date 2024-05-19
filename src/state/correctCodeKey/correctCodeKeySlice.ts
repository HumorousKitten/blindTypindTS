import { createSlice } from '@reduxjs/toolkit'

interface ICorrectCodeKeyState {
	correct: boolean | null
	codeKey: string
	currentKey: string
	nextKey: string
	letterPosition: number
	forSimilarKeyTaps?: number
}

const initialState: ICorrectCodeKeyState = {
	correct: null,
	codeKey: '',
	currentKey: '',
	nextKey: '',
	letterPosition: 0
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
			state.letterPosition = payload.letterPosition
			state.forSimilarKeyTaps = payload.forSimilarKeyTaps
		}
	}
})
export const {isCorrectCodeKey} = correctCodeKeySlice.actions
export default correctCodeKeySlice.reducer
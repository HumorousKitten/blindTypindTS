import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { progressionOneCorrectChar } from '../utils/progressBar/progressionOneCorrectChar';

interface ISimulatorInputInfo {
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
}

interface IStore {
	simulatorInputInfo: ISimulatorInputInfo
	progressBarWidth: number 
	isTime: boolean

	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
	increaseProgressBar: (widthStr: number) => void
	decreaseProgressBar: (widthStr: number) => void
	updateTimer: (isTime: boolean) => void
}

export const useStore = create<IStore>()(immer((set) => ({
	simulatorInputInfo: {
		requiredLetter: '',
		wrongLetter: '',
		rightLetter: ''
	},
	progressBarWidth: 0,
	isTime: false,


	clearLetter: (requiredLetter) => set(state => {
		state.simulatorInputInfo.requiredLetter = requiredLetter
		state.simulatorInputInfo.wrongLetter = ''
		state.simulatorInputInfo.rightLetter = ''
	}),

	updateRequiredLetter: (requiredLetter) => set(state => {
		state.simulatorInputInfo.requiredLetter = requiredLetter
	}),

	updateWrongLetter: (requiredLetter, wrongLetter) => set(state => {
		state.simulatorInputInfo.requiredLetter = requiredLetter
		state.simulatorInputInfo.wrongLetter = wrongLetter
		state.simulatorInputInfo.rightLetter = ''
	}),

	updateRightLetter: (requiredLetter, rightLetter) => set(state => {
		state.simulatorInputInfo.requiredLetter = requiredLetter
		state.simulatorInputInfo.rightLetter = rightLetter
		state.simulatorInputInfo.wrongLetter = ''
	}),

	increaseProgressBar: (widthStr) => set(state => {
		state.progressBarWidth += progressionOneCorrectChar(widthStr)
	}),

	decreaseProgressBar: (widthStr) => set(state => {
		state.progressBarWidth -= progressionOneCorrectChar(widthStr)
	}),

	updateTimer: (isTime) => set(state => {
		state.isTime = isTime
	})

})))
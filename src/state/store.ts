import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { progressionOneCorrectChar } from '../utils/progressBar/progressionOneCorrectChar';
import { server } from '../server/server'

interface ISimulatorInputInfo {
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
}

interface simulatorLevel {
	simulatorStr: string 
	level: number
	subLevel: number
}

interface IStore {
	maxLevel: number
	simulatorInputInfo: ISimulatorInputInfo
	progressBarWidth: number 
	isTime: boolean | null
	simulatorLevel: simulatorLevel
	endTime: string

	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
	increaseProgressBar: (widthStr: number) => void
	decreaseProgressBar: (widthStr: number) => void
	clearProgressBar: () => void
	updateTimer: (isTime: boolean) => void
	updateSimulatorLevel: (simulatorStr: string, level: number, subLevel: number) => void
	updateSimulatorStr: (simulatorStr: string) => void
	updateEndTime: (endTime: string) => void
}

export const useStore = create<IStore>()(immer((set) => ({
	maxLevel: 8,

	simulatorInputInfo: {
		requiredLetter: '',
		wrongLetter: '',
		rightLetter: ''
	},

	progressBarWidth: 0,
	isTime: null,
	

	simulatorLevel: {
		simulatorStr: '',
		level: 0,
		subLevel: 1
	},

	endTime: '',

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

	clearProgressBar: () => set(state => {
		state.progressBarWidth = 0
	}),

	updateTimer: (isTime) => set(state => {
		state.isTime = isTime
	}), 

	updateSimulatorLevel: (simulatorStr, level, subLevel) => set(state => {
		state.simulatorLevel.simulatorStr = simulatorStr
		state.simulatorLevel.level = level
		state.simulatorLevel.subLevel = subLevel
	}),

	updateSimulatorStr: (simulatorStr) => set(state => {
		state.simulatorLevel.simulatorStr = simulatorStr
	}),

	updateEndTime: (endTime) => set(state => {
		state.endTime = endTime
	})
})))
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
	level: number | null
	subLevel: number | null
}

interface IStore {
	simulatorInputInfo: ISimulatorInputInfo
	progressBarWidth: number 
	isTime: boolean
	simulatorLevel: simulatorLevel

	getInitialLevel: () => void
	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
	increaseProgressBar: (widthStr: number) => void
	decreaseProgressBar: (widthStr: number) => void
	updateTimer: (isTime: boolean) => void
	updateSimulatorLevel: (simulatorStr: string, level: number, subLevel: number) => void
}

export const useStore = create<IStore>()(immer((set) => ({
	simulatorInputInfo: {
		requiredLetter: '',
		wrongLetter: '',
		rightLetter: ''
	},

	progressBarWidth: 0,
	isTime: false,
	

	simulatorLevel: {
		simulatorStr: '',
		level: null,
		subLevel: null
	},

	getInitialLevel: async () => {
		const data = await server.getLevel(0, 1);
		set((state) => {
			state.simulatorLevel.simulatorStr = data
		});
	},

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
	}), 

	updateSimulatorLevel: (simulatorStr, level, subLevel) => set(state => {
		state.simulatorLevel.simulatorStr = simulatorStr
		state.simulatorLevel.level = level
		state.simulatorLevel.subLevel = subLevel
	})
})))
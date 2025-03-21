import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';


interface ISimulatorInputInfo {
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
}

interface IStore {
	simulatorInputInfo: ISimulatorInputInfo
	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
}

export const useStore = create<IStore>()(immer((set) => ({
	simulatorInputInfo: {
		requiredLetter: '',
		wrongLetter: '',
		rightLetter: ''
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
	}),

	updateRightLetter: (requiredLetter, rightLetter) => set(state => {
		state.simulatorInputInfo.requiredLetter = requiredLetter
		state.simulatorInputInfo.rightLetter = rightLetter
	})
	
})))
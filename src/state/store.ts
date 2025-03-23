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
	progressBarWidth: number //нужно написать функцию, которая увеличивает прогресс бар на определенное значение, вызываться она будет в методе в сторе, а сам метод из стора вызываться в компоненте строки, когда была правильно введена буква
	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
	increaseProgressBar: (widthStr: number) => void
	decreaseProgressBar: (widthStr: number) => void
}

export const useStore = create<IStore>()(immer((set) => ({
	simulatorInputInfo: {
		requiredLetter: '',
		wrongLetter: '',
		rightLetter: ''
	},

	progressBarWidth: 0,

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
	})

})))
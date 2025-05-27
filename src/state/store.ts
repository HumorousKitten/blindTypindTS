import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { IUserRoles } from '../types/types'
import { progressionOneCorrectChar } from '../utils/progressBar/progressionOneCorrectChar'

interface ISimulatorInputInfo {
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
}

interface IStore {
	isAuth: boolean
	user_role: IUserRoles | ''
	simulatorInputInfo: ISimulatorInputInfo
	progressBarWidth: number
	isTime: boolean | null
	endTime: string

	clearLetter: (requiredLetter: string) => void
	updateRequiredLetter: (requiredLetter: string) => void
	updateWrongLetter: (requiredLetter: string, wrongLetter: string) => void
	updateRightLetter: (requiredLetter: string, rightLetter: string) => void
	increaseProgressBar: (widthStr: number) => void
	decreaseProgressBar: (widthStr: number) => void
	clearProgressBar: () => void
	updateTimer: (isTime: boolean) => void
	updateEndTime: (endTime: string) => void
	updateUserRole: (role: IUserRoles) => void
	updateIsAuth: (isAuth: boolean) => void
}

export const useStore = create<IStore>()(
	persist(
		immer(set => ({
			isAuth: false,
			user_role: '',

			simulatorInputInfo: {
				requiredLetter: '',
				wrongLetter: '',
				rightLetter: '',
			},

			progressBarWidth: 0,
			isTime: null,

			endTime: '',

			clearLetter: requiredLetter =>
				set(state => {
					state.simulatorInputInfo.requiredLetter = requiredLetter
					state.simulatorInputInfo.wrongLetter = ''
					state.simulatorInputInfo.rightLetter = ''
				}),

			updateRequiredLetter: requiredLetter =>
				set(state => {
					state.simulatorInputInfo.requiredLetter = requiredLetter
				}),

			updateWrongLetter: (requiredLetter, wrongLetter) =>
				set(state => {
					state.simulatorInputInfo.requiredLetter = requiredLetter
					state.simulatorInputInfo.wrongLetter = wrongLetter
					state.simulatorInputInfo.rightLetter = ''
				}),

			updateRightLetter: (requiredLetter, rightLetter) =>
				set(state => {
					state.simulatorInputInfo.requiredLetter = requiredLetter
					state.simulatorInputInfo.rightLetter = rightLetter
					state.simulatorInputInfo.wrongLetter = ''
				}),

			increaseProgressBar: widthStr =>
				set(state => {
					state.progressBarWidth += progressionOneCorrectChar(widthStr)
				}),

			decreaseProgressBar: widthStr =>
				set(state => {
					state.progressBarWidth -= progressionOneCorrectChar(widthStr)
				}),

			clearProgressBar: () =>
				set(state => {
					state.progressBarWidth = 0
				}),

			updateTimer: isTime =>
				set(state => {
					state.isTime = isTime
				}),

			updateEndTime: endTime =>
				set(state => {
					state.endTime = endTime
				}),

			updateUserRole: role => set({ user_role: role }),
			updateIsAuth: isAuth => set({ isAuth: isAuth }),
		})),
		{
			name: 'auth-storage',
			partialize: state => ({ isAuth: state.isAuth }),
		}
	)
)

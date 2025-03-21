import { create } from 'zustand';

interface IStore {
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
	updateRequiredLetter: (letter: string) => void
	updateWrongLetter: (letter: string) => void
	updateRightLetter: (letter: string) => void
}

const useStore = create<IStore>((set) => ({
	requiredLetter: '',
	wrongLetter: '',
	rightLetter: '',

	updateRequiredLetter: (letter: string) => set({requiredLetter: letter}),
	updateWrongLetter: (letter: string) => set({wrongLetter: letter}),
	updateRightLetter: (letter: string) => set({rightLetter: letter}) 
}))
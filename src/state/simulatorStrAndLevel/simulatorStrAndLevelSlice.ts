import { createSlice } from '@reduxjs/toolkit'

interface ISimulatorStrAndLevelState {
	simulatorStr: string
	level: number
	sublevel?: number
}

const initialState: ISimulatorStrAndLevelState = {
	simulatorStr: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet felis a eros imperdiet, nec ornare nibh euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur elementum odio at ligula vehicula, vel sagittis metus vestibulum.`,
	level: 0,
}

const simulatorStrAndLevelSlice = createSlice({
	name: "simulatorStrAndLevel",
	initialState,
	reducers: {
		addStrAndLevel: (state, { payload }) => {
			state.simulatorStr = payload.simulatorStr
			state.level = payload.level
			state.sublevel = payload?.sublevel
		}
	}
})

export const {addStrAndLevel} = simulatorStrAndLevelSlice.actions
export default simulatorStrAndLevelSlice.reducer
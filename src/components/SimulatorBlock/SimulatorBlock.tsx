import React from 'react'
import { KeyBoardBlock } from '../KeyboardBlock/KeyboardBlock'
import { SimulatorStr } from '../SimulatorStr/SimulatorStr'
import { FinalResults } from '../finalResults/FinalResults'
import { ProgressBar } from '../progressBar/ProgressBar'
import { Timer } from '../timer/Timer'
import { NavigateToLevels } from '../navigateToLevels/NavigateToLevels'
import cl from './_SimulatorBlock.module.scss'


export const SimulatorBlock = () => {
  const [isEndLevel, setIsEndLevel] = React.useState<boolean>(false) 

	return (
		<div className={cl.MainContainer}>
			{isEndLevel ? (
				<FinalResults />
			) : (
				<>
					<Timer />
					<NavigateToLevels />
					<SimulatorStr setIsEnd = {setIsEndLevel}/>
				</>
			)}
			<ProgressBar mc={isEndLevel ? 'mc' : undefined} />
			{isEndLevel ? <NavigateToLevels mc='mc'/> : null}
			<KeyBoardBlock />
		</div>
	)
}

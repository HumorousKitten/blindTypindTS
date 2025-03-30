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

	const [mistakes, setMistakes] = React.useState<string[]>([])

	return (
		<div className={cl.MainContainer}>
			{isEndLevel ? (
				<FinalResults countOfMistakes = {mistakes.length}/>
			) : (
				<>
					<Timer />
					<NavigateToLevels />
					<SimulatorStr setIsEnd = {setIsEndLevel} setMistakes = {setMistakes}/>
				</>
			)}
			<ProgressBar mc={isEndLevel ? 'mc' : undefined} endLevel = {isEndLevel ? true : false}/>
			{isEndLevel ? <NavigateToLevels mc='mc'/> : null}
			<KeyBoardBlock mistakes = {isEndLevel ? mistakes : []}/>
		</div>
	)
}

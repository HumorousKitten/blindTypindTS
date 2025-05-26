import React from 'react'
import { KeyBoardBlock } from '../KeyboardBlock/KeyboardBlock'
import { SimulatorStr } from '../SimulatorStr/SimulatorStr'
import { FinalResults } from '../finalResults/FinalResults'
import { ProgressBar } from '../progressBar/ProgressBar'
import { Timer } from '../timer/Timer'
import { NavigateToLevels } from '../navigateToLevels/NavigateToLevels'
import { UsefulIcons } from '../../UI/usefulIcons/UsefulIcons'
import cl from './_SimulatorBlock.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'


export const SimulatorBlock = () => {
	const navigate = useNavigate()
	const location = useLocation()


	const {slug, courseId, title, countSubLevels, lang, levelId, sublevel} = location.state

	const [isEndLevel, setIsEndLevel] = React.useState<boolean>(false) 
	const [mistakes, setMistakes] = React.useState<string[]>([])
	const [сourseStage, setCourseStage] = React.useState<{level: number, sublevel:number}>({level: levelId, sublevel: sublevel})
	const [textLength, setTextLength] = React.useState<number>(0)

	if(!slug || !courseId) {
		navigate('/courses')
		return
	}

	return (
		<div className={cl.MainContainer}>
			{isEndLevel ? (
				<FinalResults countOfMistakes = {mistakes.length} textLength={textLength}/>
			) : (
				<>
					<Timer />
					<NavigateToLevels slug={slug} courseId = {courseId} title = {title}/>
					<SimulatorStr setIsEnd = {setIsEndLevel} setMistakes = {setMistakes} сourseStage = {сourseStage} setTextLength={setTextLength}/>
				</>
			)}
			<ProgressBar mc={isEndLevel ? 'mc' : undefined} endLevel = {isEndLevel ? true : false}/>
			{!isEndLevel ? <UsefulIcons setMistakes = {setMistakes} countSubLevels = {countSubLevels} sublevelOrder={сourseStage.sublevel}  setCourseStage={setCourseStage}/> : null}
			{isEndLevel ? <NavigateToLevels mc='mc' slug={slug} courseId = {courseId} title = {title}/> : null}
			<KeyBoardBlock mistakes = {isEndLevel ? mistakes : []} lang={lang}/>
		</div>
	)
}

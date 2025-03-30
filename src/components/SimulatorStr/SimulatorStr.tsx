import React, { FC } from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '../../state/store'
import { unwantedKeys} from './unwantedKeys'
import cl from './_SimulatorStr.module.scss'




interface ISpanArr {
	letter: string
	isWrong: boolean
	isRight: boolean
}

interface ISimulatorStrProps {
	setIsEnd: (value: boolean) => void
	setMistakes: (mistakes: string[]) => void
}

export const SimulatorStr: FC<ISimulatorStrProps> = ({setIsEnd, setMistakes}) => {

	const updateRequiredLetter = useStore(state => state.updateRequiredLetter)
	const updateRightLetter = useStore(state => state.updateRightLetter)
	const updateWrongLetter = useStore(state => state.updateWrongLetter)
	const clearLetter = useStore(state => state.clearLetter)
	const increaseProgressBar = useStore(state => state.increaseProgressBar)
	const decreaseProgressBar = useStore(state => state.decreaseProgressBar)
	const updateTimer = useStore(state => state.updateTimer)
	const getInitialLevel = useStore(state => state.getInitialLevel)
	const {simulatorStr} = useStore(state => state.simulatorLevel)

	const [dividedSpanStr, updateDividedSpanStr] = useImmer<ISpanArr[]>([]) 

	const simulatorText = React.useRef<HTMLParagraphElement>(null)
	const index = React.useRef<number>(0)
	const mistakes: string[] = []

	React.useEffect(() => {
		if (simulatorStr.length === 0) {
			getInitialLevel()
		}

		updateRequiredLetter(simulatorStr.charAt(0))
		updateDividedSpanStr(addSpan())
		window.addEventListener('keydown', keyPressing)
		
		return () => {
			window.removeEventListener('keydown', keyPressing)
		}
	}, [simulatorStr])

	function addSpan(): ISpanArr[] {
		return [...simulatorStr].map((letter) => (
			{
				letter,
				isWrong: false,
				isRight: false,
			}
		))
	}

	function keyPressing(e: KeyboardEvent) {
		if(index.current === simulatorStr.length) return

		if(e.key in unwantedKeys) return

		updateTimer(true)
	
		let letterPos = index.current
		
		if(e.key === 'Backspace'){
			backSpace()
			return
		}

		if(e.key === simulatorStr.charAt(index.current)){
			updateRightLetter(simulatorStr.charAt(++letterPos), e.key)
			increaseProgressBar(simulatorStr.length)
			rightLetter(index.current)
		}
		else{
			mistakes.push(Number(e.key) ? e.key : e.key.toUpperCase())
			updateWrongLetter(simulatorStr.charAt(++letterPos), e.key) 
			wrongLetter(index.current)
		}

		if(index.current + 1 === simulatorStr.length) {
			updateTimer(false)
			setMistakes(mistakes)
			setIsEnd(true)
		}

		index.current++
	}

	function rightLetter(index: number) {
		updateDividedSpanStr(draft => {
			draft[index].isRight = true 
		})
	}

	function wrongLetter(index: number) {
		updateDividedSpanStr(draft => {
			draft[index].isWrong = true
		})
	}

	function backSpace(){
		if(!index.current) return
		clearLetter(simulatorStr.charAt(index.current))
		decreaseProgressBar(simulatorStr.length)

		updateDividedSpanStr(draft => {
			draft[index.current].isWrong = false
			draft[index.current].isRight = false 
		})
		index.current--;
	}

	return (
		<div className={cl.SimulatorStrBlock}>
			<p className={cl.placeholder} ref={simulatorText}>
				{dividedSpanStr.map((item, index) => (
					<span key={index}
						className={item.isRight ? cl.rightLetter : item.isWrong ? cl.wrongLetter : cl.defaultColor}
					>
						{item.letter}
					</span>
				))}
			</p>
		</div>
	)
}

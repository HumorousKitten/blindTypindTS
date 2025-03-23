import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '../../state/store'
import cl from './_SimulatorStr.module.scss'


// enum IgnoredKeys {
// 	Backspace = 'Backspace',
// 	Alt = 'Alt',
// 	ControlLeft = 'Control',
// 	ControlRight = 'Control',
// 	ShiftLeft = 'Shift',
// 	ShiftRight = 'Shift',
// 	Tab = 'Tab',
// 	Enter = 'Enter',
// 	CapsLock = 'CapsLock',
// 	Home = 'Home',
// 	Delete = 'Delete',
// 	PageUp = 'PageUp',
// 	ArrowUp = 'ArrowUp',
// 	ArrowDown = 'ArrowDown',
// 	ArrowLeft = 'ArrowLeft',
// 	ArrowRight = 'ArrowRight',
// 	PageDown = 'PageDown',
// 	MetaLeft = 'Meta',
// 	MetaRight = 'Meta',
// 	Escape = 'Escape',
// 	IntlBackslash = '§±',
// }

interface ISpanArr {
	letter: string
	isWrong: boolean
	isRight: boolean
}

export const SimulatorStr = () => {
	const simulatorStr = 'dffffffffffffffffffff'

	const {updateRequiredLetter, updateRightLetter, updateWrongLetter, clearLetter, increaseProgressBar, decreaseProgressBar} = useStore()
	const [dividedSpanStr, updateDividedSpanStr] = useImmer<ISpanArr[]>([]) 

	const simulatorText = React.useRef<HTMLParagraphElement>(null)
	const index = React.useRef<number>(0)

	React.useEffect(() => {
		if (simulatorStr.length === 0) {
			return
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
			updateWrongLetter(simulatorStr.charAt(++letterPos), e.key) 
			wrongLetter(index.current)
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

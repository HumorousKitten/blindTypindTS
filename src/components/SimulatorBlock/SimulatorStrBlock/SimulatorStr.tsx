import React from 'react'
import { useDispatch } from 'react-redux'
import { isCorrectCodeKey } from '../../../state/correctCodeKey/correctCodeKeySlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import cl from './_SimulatorStr.module.scss'

enum IgnoredKeys {
	Backspace = 'Backspace',
	Alt = 'Alt',
	ControlLeft = 'Control',
	ControlRight = 'Control',
	ShiftLeft = 'Shift',
	ShiftRight = 'Shift',
	Tab = 'Tab',
	Enter = 'Enter',
	CapsLock = 'CapsLock',
	Home = 'Home',
	Delete = 'Delete',
	PageUp = 'PageUp',
	ArrowUp = 'ArrowUp',
	ArrowDown = 'ArrowDown',
	ArrowLeft = 'ArrowLeft',
	ArrowRight = 'ArrowRight',
	PageDown = 'PageDown',
	MetaLeft = 'Meta',
	MetaRight = 'Meta',
	Escape = 'Escape',
	IntlBackslash = '§±',
}

export const SimulatorStr = () => {
	const {simulatorStr} = useSelector((state: RootState) => state.simulatorStrAndLevel)

	const simulatorText = React.useRef<HTMLParagraphElement>(null)
	const index = React.useRef<number>(0)
	const forSimilarKeyTaps = React.useRef<number>(0)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (simulatorStr.length === 0) {
			return
		}
		window.addEventListener('keydown', keyPressing)
		dispatch(
			isCorrectCodeKey({
				correct: null,
				codeKey: '',
				currentKey: '',
				nextKey: simulatorStr.charAt(0),
				letterPosition: 0
			})
		)

		return () => {
			window.removeEventListener('keydown', keyPressing)
		}
	}, [simulatorStr])

	function addSpan(): JSX.Element[] {
		return [...simulatorStr].map((letter, index) => (
			<span key={index} id={index + ''}>
				{letter}
			</span>
		))
	}

	const keyPressing = (e: KeyboardEvent): void => {
		if (index.current === simulatorStr.length) return

		if (!(e.code in IgnoredKeys)) {
			equals(e.key, e.code, index.current + '')
			index.current += 1
		}

		if (e.key === 'Backspace') {
			backSpace()
		}
	}

	function equals(key: string, code: string, index: string) {
		const element: HTMLElement | null = document.getElementById(index)
		
		if (!element) {
			return
		}

		if (key !== simulatorStr[+index]) {
			element.style.color = 'red'
			dispatch(
				isCorrectCodeKey({
					correct: false,
					codeKey: code,
					currentKey: simulatorStr.charAt(+index),
					nextKey: simulatorStr.charAt(+index + 1),
					letterPosition: +index
				})
			)
			return
		}

		element.style.color = 'white'
		dispatch(
			isCorrectCodeKey({
				correct: true,
				codeKey: code,
				currentKey: simulatorStr.charAt(+index),
				nextKey: simulatorStr.charAt(+index + 1),
				letterPosition: +index
			})
		)
	}

	function backSpace(): void {
		dispatch(
			isCorrectCodeKey({
				correct: true,
				codeKey: 'Backspace',
				currentKey: '',
				nextKey: simulatorStr.charAt(+index + 1),
				letterPosition: 0,
				forSimilarKeyTaps: forSimilarKeyTaps.current++
			})
		)

		if (index.current === 0) {
			return
		}
		
		const element: HTMLElement | null = document.getElementById(
			index.current - 1 + ''
		)
	
		if (!element) {
			return
		}

		if (index.current > 0) {
			element.style.color = 'rgba(255, 255, 255, 0.2)'
			dispatch(
				isCorrectCodeKey({
					correct: true,
					codeKey: 'Backspace',
					currentKey: simulatorStr.charAt(index.current - 1),
					nextKey: simulatorStr.charAt(index.current),
					letterPosition: index.current
				})
			)
			index.current -= 1
		}
	}

	return (
		<div className={cl.SimulatorStrBlock}>
			<p className={cl.placeholder} ref={simulatorText}>
				{simulatorStr.length !== 0 && addSpan()}
			</p>
		</div>
	)
}

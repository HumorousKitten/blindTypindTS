import React from 'react'
import cl from './_SimulatorStr.module.scss'

enum IgnoredKeys {
	Backspace = 'Backspace',
	Alt = 'Alt',
	Control = 'Control',
	Shift = 'Shift',
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
	Meta = 'Meta',
	Escape = 'Escape',
}

export const SimulatorStr = () => {
	const [simulatorStr, setSimulatorStr] = React.useState<string>(
		'sdfkjbskdfkladhbashkbfasfbhsalfasf'
	)
	const simulatorText = React.useRef<HTMLParagraphElement>(null)
	const index = React.useRef<number>(0)

	React.useEffect(() => {
		if (simulatorStr.length === 0) {
			return
		}

		window.addEventListener('keydown', keyPressing)

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

		if (!(e.key in IgnoredKeys)) {
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
			return
		}

		element.style.color = 'white'
	}

	function backSpace(): void {
		const element: HTMLElement | null = document.getElementById(
			index.current - 1 + ''
		)

		if (index.current === 0) {
			return
		}

		if (!element) {
			return
		}

		if (index.current > 0) {
			element.style.color = 'rgba(255, 255, 255, 0.2)'
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

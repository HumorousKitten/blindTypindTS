import React from 'react'
import { useStore } from '../../state/store'
import { RunningCat } from '../../UI/runningCat/RunningCat'
import { timer } from '../../utils/timer/timer'

import cl from './_timer.module.scss'

export const Timer = () => {
	const [term, setTerm] = React.useState<string>('00:00')
	const isRunning = useStore(state => state.isTime)
	const updateEndTime = useStore(state => state.updateEndTime)
	const termRef = React.useRef<string>('00:00')
	const clearTimer = React.useRef<(() => void) | null>(null)

	function getTime(time: string) {
		setTerm(time)
	}

	React.useEffect(() => {
		termRef.current = term
	}, [term])

	React.useEffect(() => {
		if (isRunning) {
			clearTimer.current = timer(getTime).clearTimer
		}

		if(!isRunning){
			if(clearTimer.current)
				clearTimer.current()
			setTerm('00:00')
		}

		return () => {
			if (clearTimer.current) {
				clearTimer.current()
				updateEndTime(termRef.current)
			}
		}
	}, [isRunning])

	return (
		<div className={cl.timer}>
			<RunningCat
				widthPx={141}
				heightPx={135}
				classNames={{ position: 'absolute' }}
				coordPosition={{ top: -35 }}
				isRunning={isRunning}
			/>
			<p>{term}</p>
		</div>
	)
}

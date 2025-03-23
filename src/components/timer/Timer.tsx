import React from 'react';
import { RunningCat } from '../../UI/runningCat/RunningCat';
import { timer } from '../../utils/timer/timer';
import { useStore } from '../../state/store';

import cl from './_timer.module.scss';




export const Timer = () => {
	const [term, setTerm] = React.useState<string>('00:00')
	const isRunning = useStore(state => state.isTime)

	function getTime(time: string) {
		setTerm(time)
	}

	React.useEffect(() => {
		if(isRunning){
			const {clearTimer} = timer(getTime)

			return () => {
				clearTimer()
			}
		}
	}, [isRunning])

	return (
		<div className={cl.timer}>
			<RunningCat widthPx={141} heightPx={135} classNames={{position: 'absolute'}} coordPosition={{top: -35}} isRunning = {isRunning}/>
			<p>{term}</p>
		</div>
	);
}

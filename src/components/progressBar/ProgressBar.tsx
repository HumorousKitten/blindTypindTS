import React from 'react';
import { useStore } from '../../state/store';

import cl from './_progressBar.module.scss';

export const ProgressBar = () => {
	const progressBarWidth = useStore(state => state.progressBarWidth)

	return (
		<div className={cl.mainBar}>
			<div className={cl.secondBar}></div>
			<div className={cl.thirdBar} style = {{width: `${progressBarWidth.toFixed(3)}%`}}></div>
		</div>
	);
}
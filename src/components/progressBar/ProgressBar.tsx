import React from 'react';
import { useStore } from '../../state/store';

import cl from './_progressBar.module.scss';

interface IPropgressBarProps {
	mc?: 'mc' 
}

export const ProgressBar = ({mc}) => {
	const progressBarWidth = useStore(state => state.progressBarWidth)

	return (
		<div className={`${cl.mainBar} ${mc ? cl.mc : cl.ml}`}>
			<div className={cl.secondBar}></div>
			<div className={cl.thirdBar} style = {{width: `${progressBarWidth.toFixed(3)}%`}}></div>
		</div>
	);
}
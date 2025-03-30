import React, { FC } from 'react';
import { useStore } from '../../state/store';

import cl from './_progressBar.module.scss';

interface IPropgressBarProps {
	mc?: 'mc'
	endLevel: boolean 
}

export const ProgressBar: FC<IPropgressBarProps> = ({mc, endLevel}) => {
	const progressBarWidth = useStore(state => state.progressBarWidth)
	const [animate, setAnimate] = React.useState<boolean>(false)
	
	React.useEffect(() => {
		if(endLevel){
			setAnimate(true)
		}
	}, [endLevel])

	return (
		<div className={`${cl.mainBar} ${mc ? cl.mc : cl.ml}`}>
			<div className={cl.secondBar}></div>
			<div className={`${cl.thirdBar} ${animate ? cl.animateThirdBar : ''}`} style = {{width: `${progressBarWidth.toFixed(3)}%`}}></div>
		</div>
	);
}
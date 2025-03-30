import React, { FC } from 'react'
import { useStore } from '../../state/store'
import again from '../../assets/img/icons/again_buttom.svg'
import nextLevel from '../../assets/img/icons/next_buttom.svg'
import turnHands from '../../assets/img/icons/hands_buttom.svg'
import lang from '../../assets/img/icons/language_buttom.svg'

import cl from './_usefulIcons.module.scss'


interface IUsefulIcons {
	setMistakes: (value: []) => void
}

export const UsefulIcons: FC<IUsefulIcons> = ({setMistakes}) => {
	const [rotateAnimation, setRotateAnimation] = React.useState<boolean>(false)
	const updateSimulatorStr = useStore(state => state.updateSimulatorStr)
	const updateTimer = useStore(state => state.updateTimer)
	const clearProgressBar = useStore(state => state.clearProgressBar)

	function clear() {
		setRotateAnimation(prev => !prev)
		setMistakes([])
		updateSimulatorStr('')
		updateTimer(false)
		clearProgressBar()
	}

	return (
		<div className={cl.usefulIcons}>
			<div className={cl.firstGroupIcons}>
				<img src={again} alt="againIcon" onClick = {clear} className={rotateAnimation ? cl.rotate : ''}/>
				<img src={nextLevel} alt="nextLevelIcon" />
			</div>
			<div className={cl.secondGroupIcons}>
				<img src={turnHands} alt="turnHandsIcon" />
				<img src={lang} alt="changeLangIcon" />
			</div>
		</div>
	);
}
 
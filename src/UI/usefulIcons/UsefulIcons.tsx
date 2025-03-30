import React, { FC } from 'react'
import { useImmer } from 'use-immer'
import again from '../../assets/img/icons/again_buttom.svg'
import turnHands from '../../assets/img/icons/hands_buttom.svg'
import lang from '../../assets/img/icons/language_buttom.svg'
import next from '../../assets/img/icons/next_buttom.svg'
import { server } from '../../server/server'
import { useStore } from '../../state/store'

import { useQuery } from '@tanstack/react-query'
import cl from './_usefulIcons.module.scss'

interface IUsefulIcons {
	setMistakes: (value: []) => void
}

interface IChangeLevel {
	level: number
	sublevel: number
}

async function getSimulatorLevel(level: number, sublevel: number) {
	const data = server.getLevel(level, sublevel)

	return data
}

export const UsefulIcons: FC<IUsefulIcons> = ({ setMistakes }) => {
	const [rotateAnimation, setRotateAnimation] = React.useState<boolean>(false)
	const maxLevel = useStore(state => state.maxLevel)
	const updateSimulatorStr = useStore(state => state.updateSimulatorStr)
	const updateSimulatorLvl = useStore(state => state.updateSimulatorLevel)
	const updateTimer = useStore(state => state.updateTimer)
	const clearProgressBar = useStore(state => state.clearProgressBar)

	const [changeLevel, updateLevel] = useImmer<IChangeLevel>({
		level: 0,
		sublevel: 1,
	})

	const { data, refetch } = useQuery({
		queryKey: ['levelData', changeLevel.level, changeLevel.sublevel],
		queryFn: () => getSimulatorLevel(changeLevel.level, changeLevel.sublevel),
		enabled: false,
	})

	React.useEffect(() => {
		refetch()
	}, [changeLevel.level, changeLevel.sublevel, refetch])

	React.useEffect(() => {
		if (data) updateSimulatorLvl(data, changeLevel.level, changeLevel.sublevel)
	}, [data])

	function nextLevel() {
		if(!changeLevel.level) {
			updateLevel(draft => {
				draft.level++
			})
		}
		else if (changeLevel.level === maxLevel && changeLevel.sublevel === 3) {
			updateLevel(draft => {
				draft.level = 0
				draft.sublevel = 1
			})
		} else if (changeLevel.sublevel === 3) {
			updateLevel(draft => {
				draft.sublevel = 0
				draft.level++
			})
		} else {
			updateLevel(draft => {
				draft.sublevel++
			})
		}
	}

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
				<img
					src={again}
					alt='againIcon'
					onClick={clear}
					className={rotateAnimation ? cl.rotate : ''}
				/>
				<img src={next} alt='nextLevelIcon' onClick={nextLevel} />
			</div>
			<div className={cl.secondGroupIcons}>
				<img src={turnHands} alt='turnHandsIcon' />
				<img src={lang} alt='changeLangIcon' />
			</div>
		</div>
	)
}

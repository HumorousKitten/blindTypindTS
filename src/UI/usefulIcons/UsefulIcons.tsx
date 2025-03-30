import React, { FC } from 'react'
import { useImmer } from 'use-immer'
import again from '../../assets/img/icons/again_buttom.svg'
import turnHands from '../../assets/img/icons/hands_buttom.svg'
import lang from '../../assets/img/icons/language_buttom.svg'
import next from '../../assets/img/icons/next_buttom.svg'
import { server } from '../../server/server'
import { useStore } from '../../state/store'

import { useMutation } from '@tanstack/react-query'
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
	const {level, subLevel} = useStore(state => state.simulatorLevel)
	const changeLevel = React.useRef<IChangeLevel>({
		level: level,
		sublevel: subLevel,
	})


	const mutation = useMutation({
		mutationFn: async ({ level, sublevel }: IChangeLevel) => server.getLevel(level, sublevel),
		onSuccess: data => {
			updateSimulatorLvl(data, changeLevel.current.level, changeLevel.current.sublevel)	
		},
	})

	function nextLevel() {
		if (!changeLevel.current.level) {
			++changeLevel.current.level
		} else if (changeLevel.current.level === maxLevel && changeLevel.current.sublevel === 3) {
			changeLevel.current.level = 0
			changeLevel.current.sublevel = 1
		} else if (changeLevel.current.sublevel === 3) {
			++changeLevel.current.level
			changeLevel.current.sublevel = 1
		} else {
			++changeLevel.current.sublevel
		}

		const {level, sublevel} = changeLevel.current
		mutation.mutate({level, sublevel})
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

import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '../../../server/server'
import { useStore } from '../../../state/store'

import cl from './_LevellBlock.module.scss'
import doubleIcon from '../../../assets/img/icons/double.svg'


interface ILevelBlock {
	index: number
	value: string
	completedSubLevels: {
		level: number
		sublevel: number
	}[]
}

export const LevelBlock: FC<ILevelBlock> = ({
	index,
	value,
	completedSubLevels,
}) => {
	const navigate = useNavigate()
	const updateSimulatorLevel = useStore(state => state.updateSimulatorLevel)

	return (
		<div
			className={cl.lvlBlock}
			onClick={async () => {
				if (index === 0) {
					const simulatorStr = await server.getLevel(index, 1)
					updateSimulatorLevel(simulatorStr, index, 0)
					navigate('/')
				}
			}}
		>
			<div className={cl.infoOfLevel}>
				<span>{index}</span>
				<span>{value}</span>
				{!index ? <img src={doubleIcon} alt="doubleIcon" /> : null}
			</div>

			{index !== 0 && (
				<SubLevels index={index} completeSubLevels={completedSubLevels} />
			)}
		</div>
	)
}

interface ISubLevels {
	index: number
	completeSubLevels: {
		level: number
		sublevel: number
	}[]
}

const SubLevels: FC<ISubLevels> = ({ index, completeSubLevels }) => {
	const navigate = useNavigate()
	const updateSimulatorLevel = useStore(state => state.updateSimulatorLevel)
	const subLevels = React.useRef<HTMLDivElement>(null)

	async function searchSubLevel(event: React.MouseEvent<HTMLDivElement>) {
		const subLevelId = event.currentTarget.id.slice(
			event.currentTarget.id.indexOf('.') + 1
		)
		const simulatorStr = await server.getLevel(index, +subLevelId)
		updateSimulatorLevel(simulatorStr, index, +subLevelId)
		navigate('/')
	}
	const completeSubLevelsLookup = React.useMemo(() => {
		return completeSubLevels.reduce<Record<string, boolean>>((acc, item) => {
			acc[`${item.level}.${item.sublevel}`] = true
			return acc
		}, {})
	}, [completeSubLevels])

	return (
		<div className={cl.progressBlock}>
			{[1, 2, 3].map(subLevelNumber => {
				const key = `${index}.${subLevelNumber}`
				const isComplete = completeSubLevelsLookup[key]
				return (
					<div
						key={key}
						id={key}
						onClick={searchSubLevel}
						className={`
								${isComplete ? cl.completeSubLevel : cl.defaultSubLevelColor}
								${subLevelNumber === 1 ? cl.borderRadiusLeft : ''}
								${subLevelNumber === 3 ? cl.borderRadiusRight : ''}
								${subLevelNumber === 1 ? cl.firstSubLevelPos : ''}
								${subLevelNumber === 3 ? cl.thirdSubLevelPos : ''}
							`}
					></div>
				)
			})}
		</div>
	)
}

import { FC } from 'react'
import { ICourseLevels, ICourseSubLevels } from '../../../types/types'

import cl from './_LevellBlock.module.scss'

interface ILevelBlock {
	courseLevel: ICourseLevels
	openModal: (value: boolean) => void
	setLevelId: (value: number) => void
}

// export const LevelBlock: FC<ILevelBlock> = ({ courseLevel }) => {
// 	// const navigate = useNavigate()
// 	// const updateSimulatorLevel = useStore(state => state.updateSimulatorLevel)

// 	return (
// 		<div
// 			className={cl.lvlBlock}
// 			onClick={async () => {
// 				if (index === 0) {
// 					const simulatorStr = await server.getLevel(index, 1)
// 					updateSimulatorLevel(simulatorStr, index, 0)
// 					navigate('/')
// 				}
// 			}}
// 		>
// 			<div className={cl.infoOfLevel}>
// 				<span>{index}</span>
// 				<span>{value}</span>
// 				{!index ? <img src={doubleIcon} alt='doubleIcon' /> : null}
// 			</div>

// 			{index !== 0 && (
// 				<SubLevels index={index} completeSubLevels={completedSubLevels} />
// 			)}
// 		</div>
// 	)
// }

export const LevelBlock: FC<ILevelBlock> = ({
	courseLevel,
	openModal,
	setLevelId,
}) => {
	// const navigate = useNavigate()
	// const updateSimulatorLevel = useStore(state => state.updateSimulatorLevel)

	return (
		<div
			className={cl.lvlBlock}
			onClick={() => {
				openModal(true)
				setLevelId(courseLevel.id)
			}}
		>
			<div className={cl.infoOfLevel}>
				<span>{courseLevel.order}</span>
				<span>{courseLevel.title}</span>
			</div>

			<div className={cl.progressBlock}>
				{courseLevel.courseSubLevels.map(item => (
					<SubLevels
						subLevel={item}
						key={item.id}
						isFirst={!(item.order - 1)}
						isLast={item.order === courseLevel.courseSubLevels.length}
					/>
				))}
			</div>
		</div>
	)
}

// interface ISubLevels {
// 	index: number
// 	completeSubLevels: {
// 		level: number
// 		sublevel: number
// 	}[]
// }

// const SubLevels: FC<ISubLevels> = ({ index, completeSubLevels }) => {
// 	const navigate = useNavigate()
// 	const updateSimulatorLevel = useStore(state => state.updateSimulatorLevel)
// 	const subLevels = React.useRef<HTMLDivElement>(null)

// 	async function searchSubLevel(event: React.MouseEvent<HTMLDivElement>) {
// 		const subLevelId = event.currentTarget.id.slice(
// 			event.currentTarget.id.indexOf('.') + 1
// 		)
// 		const simulatorStr = await server.getLevel(index, +subLevelId)
// 		updateSimulatorLevel(simulatorStr, index, +subLevelId)
// 		navigate('/')
// 	}
// 	const completeSubLevelsLookup = React.useMemo(() => {
// 		return completeSubLevels.reduce<Record<string, boolean>>((acc, item) => {
// 			acc[`${item.level}.${item.sublevel}`] = true
// 			return acc
// 		}, {})
// 	}, [completeSubLevels])

// 	return (
// 		<div className={cl.progressBlock}>
// 			{[1, 2, 3].map(subLevelNumber => {
// 				const key = `${index}.${subLevelNumber}`
// 				const isComplete = completeSubLevelsLookup[key]
// 				return (
// 					<div
// 						key={key}
// 						id={key}
// 						onClick={searchSubLevel}
// 						className={`
// 								${isComplete ? cl.completeSubLevel : cl.defaultSubLevelColor}
// 								${subLevelNumber === 1 ? cl.borderRadiusLeft : ''}
// 								${subLevelNumber === 3 ? cl.borderRadiusRight : ''}
// 								${subLevelNumber === 1 ? cl.firstSubLevelPos : ''}
// 								${subLevelNumber === 3 ? cl.thirdSubLevelPos : ''}
// 							`}
// 					></div>
// 				)
// 			})}
// 		</div>
// 	)
// }

interface ISubLevels {
	subLevel: ICourseSubLevels
	isFirst: boolean
	isLast: boolean
}

const SubLevels: FC<ISubLevels> = ({ subLevel, isFirst, isLast }) => {
	// const completeSubLevelsLookup = React.useMemo(() => {
	// 	return completeSubLevels.reduce<Record<string, boolean>>((acc, item) => {
	// 		acc[`${item.level}.${item.sublevel}`] = true
	// 		return acc
	// 	}, {})
	// }, [completeSubLevels])

	return (
		<div
			id={`${subLevel.id}.${subLevel.order}`}
			className={`${cl.defaultSubLevelColor} ${
				isFirst ? cl.borderRadiusLeft : ''
			} ${isLast ? cl.borderRadiusRight : ''} ${
				isFirst ? cl.firstSubLevelPos : ''
			} ${isLast ? cl.thirdSubLevelPos : ''}`}
		></div>
	)
}

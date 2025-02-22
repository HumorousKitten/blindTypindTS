import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { server } from '../../../server/server'
import { addStrAndLevel } from '../../../state/simulatorStrAndLevel/simulatorStrAndLevelSlice'
import cl from './_LevellBlock.module.scss'

interface ICompletedSubLevels {
	level?: string
	sublevel?: string
}

interface ISubLevelsProps {
	index: number
	completeSubLevels: ICompletedSubLevels[]
}

const SubLevels = ({ index, completeSubLevels }: ISubLevelsProps) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (completeSubLevels.length !== 0) {
			completeSubLevels.forEach(item => {
				const element = document.getElementById(index + '.' + item.sublevel)
				if (element) element.style.background = '#0066FF'
			})
		}
	}, [completeSubLevels])

  async function searchSubLevel(event: React.MouseEvent<HTMLDivElement>) {
    const subLevelId = event.currentTarget.id.slice(
			event.currentTarget.id.indexOf('.') + 1
    )
    const simulatorStr = await server.getLevel(index, +subLevelId)
    dispatch(addStrAndLevel({ simulatorStr, level: index, sublevel:+subLevelId }))
		navigate('/')
	}
	return (
		<>
			<div
				style={{ borderRadius: '3px 0 0 3px', right: '0px' }}
				id={index + '.' + 1}
				onClick={searchSubLevel}
			></div>
			<div
				className='subLevel'
				id={index + '.' + 2}
				onClick={searchSubLevel}
			></div>
			<div
				style={{ borderRadius: '0 3px 3px 0', left: '53px' }}
				id={index + '.' + 3}
				onClick={searchSubLevel}
			></div>
		</>
	)
}

type TLevelBlockStyle = {
	marginBottom: string
}

interface ILevelBlock {
	index: number
	value: string
	svg?: React.ReactElement
	style?: TLevelBlockStyle
	completedSubLevels?: ICompletedSubLevels[]
}

const LevelBlock: FC<ILevelBlock> = ({
	index,
	value,
	svg,
	style,
	completedSubLevels,
}) => {
	const [completeSubLevels, setCompleteSubLevels] = React.useState<
		ICompletedSubLevels[]
	>([])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (index !== 0 && completedSubLevels?.length !== 0)
			setCompleteSubLevels(searchCompletedSubLevel(index))
	}, [completedSubLevels])

	function searchCompletedSubLevel(level: number): ICompletedSubLevels[] {
		if (completedSubLevels) {
			const tmpArr = completedSubLevels.filter(item => {
				if (item.level && +item.level === level) return item
				return null
			})
			return tmpArr
		}
		return []
	}

	return (
		<div
			className={cl.lvlBlock}
			style={style}
			onClick={async () => {
				if (index === 0) {
					const simulatorStr = await server.getLevel(index, 1)
					dispatch(addStrAndLevel({ simulatorStr, level: index }))
					navigate('/')
				}
			}}
		>
			<div className={cl.infoOfLevel}>
				<span>{index}</span>
				<span>{value}</span>
				{svg}
			</div>

			<div className={cl.progressBlock}>
				{index !== 0 && (
					<SubLevels index={index} completeSubLevels={completeSubLevels} />
				)}
			</div>
		</div>
	)
}

function memoizedLevelBlock(prevProps: ILevelBlock, nextProps: ILevelBlock) {
	if (
		nextProps.completedSubLevels &&
		nextProps.completedSubLevels.length !== 0
	) {
		if (
			nextProps.completedSubLevels.find(
				obj => obj.level && +obj.level === nextProps.index
			)
		)
			return false
		return true
	}
	return false
}

export const MemoizedLevelBlock = React.memo(LevelBlock, memoizedLevelBlock)

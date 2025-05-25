import { FC } from 'react'
import { ICourseLevels, ICourseSubLevels } from '../../../types/types'
import cl from './_LevellBlock.module.scss'
import { Link } from 'react-router-dom'

interface ILevelBlock {
	courseLevel: ICourseLevels
	openModal: (value: boolean) => void
	setLevelId: (value: number) => void
}

export const LevelBlock: FC<ILevelBlock> = ({
	courseLevel,
	openModal,
	setLevelId,
}) => {

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
						title={courseLevel.title}
						order={courseLevel.order}
						key={item.id}
						isFirst={!(item.order - 1)}
						isLast={item.order === courseLevel.courseSubLevels.length}
					/>
				))}
			</div>
		</div>
	)
}

interface ISubLevels {
	subLevel: ICourseSubLevels
	title: string
	order: number
	isFirst: boolean
	isLast: boolean
}

function slugify(title: string) {
	return title.toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-').replace(/^-+|-+$/g, '')
}

const SubLevels: FC<ISubLevels> = ({ subLevel, isFirst, isLast, title, order }) => {

	return (
		<Link
			to={`/course-content/${slugify(title)}/subTask/${order}.${subLevel.order}`}
			state={{subLevelId: subLevel.id}}
			onClick={e => e.stopPropagation()}
			className={cl.subLevel}
		>
			<div
				className={`${cl.defaultSubLevelColor} ${
					isFirst ? cl.borderRadiusLeft : ''
				} ${isLast ? cl.borderRadiusRight : ''} ${
					isFirst ? cl.firstSubLevelPos : ''
				} ${isLast ? cl.thirdSubLevelPos : ''}`}
			></div>
		</Link>
	)
}

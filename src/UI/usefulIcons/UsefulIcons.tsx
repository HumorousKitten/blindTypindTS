import React, { FC } from 'react'
import again from '../../assets/img/icons/again_buttom.svg'
import turnHands from '../../assets/img/icons/hands_buttom.svg'
import next from '../../assets/img/icons/next_buttom.svg'
import { useStore } from '../../state/store'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import cl from './_usefulIcons.module.scss'

interface IUsefulIcons {
	setMistakes: (value: []) => void
	countSubLevels: number
	sublevelOrder: number
	setCourseStage: React.Dispatch<
		React.SetStateAction<{
			level: number
			sublevel: number
		}>
	>
}

export const UsefulIcons: FC<IUsefulIcons> = ({
	setMistakes,
	countSubLevels,
	sublevelOrder,
	setCourseStage,
}) => {
	const { task_title, subTaskId } = useParams()
	const navigate = useNavigate()

	const location = useLocation()
	const { slug, courseId, title, lang, levelId} = location.state

	const [rotateAnimation, setRotateAnimation] = React.useState<boolean>(false)

	const updateTimer = useStore(state => state.updateTimer)
	const clearProgressBar = useStore(state => state.clearProgressBar)

	function nextLevel() {
		const levelOrder = +(subTaskId?.slice(
			0,
			subTaskId.lastIndexOf('.')
		) as string)

		if (sublevelOrder !== countSubLevels) sublevelOrder++
		else {
			sublevelOrder = 1
		}

		setCourseStage(prev => ({ ...prev, sublevel: sublevelOrder }))

		navigate(
			`/course-content/${task_title}/subTask/${levelOrder}.${sublevelOrder}`,
			{
				state: {
					slug,
					courseId,
					title,
					countSubLevels,
					lang,
					levelId,
					sublevel: sublevelOrder
				}
			}
		)
	}

	function clear() {
		setRotateAnimation(prev => !prev)
		setMistakes([])
		setCourseStage((prev) => ({...prev}))
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
			</div>
		</div>
	)
}

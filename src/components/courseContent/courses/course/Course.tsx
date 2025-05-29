import { FC } from 'react'
import { StatusModal } from './StatusModal.tsx'
import { ICourse, IUserRoles } from '../../../../types/types'
import { FavoriteIcon } from '../../../../UI/icons/FavoriteIcon'

import cl from './_course.module.scss'

import { Link } from 'react-router-dom'
import countUsers from '../../../../assets/img/icons/countUsers.svg'
import rating from '../../../../assets/img/icons/rating.svg'
import time from '../../../../assets/img/icons/time.svg'
import isModeration from '../../../../assets/img/icons/moderation_timer.svg'

import Button from '../../../../UI/button/Button'

interface ICourseProps {
	course: ICourse
	user_role: IUserRoles | ''
}

export const Course:FC<ICourseProps> = ({ course, user_role }) => {

	return (
		<div
			className={`${cl.course} ${
				course.fromWhom === 'admin' ? cl.adminCourse : ''
			}`}
		>
			<StatusModal>
				<div className={cl.statusModal}>
					<Button additionalClasses={{background: 'transparent', editBtn: true}} className={cl.statusModal__editBtn}><span></span></Button>
					<img src={isModeration} alt="timer" />
					<p>На модерации</p>
				</div>
			</StatusModal>

			<Link to={`/courses/${course.slug}/${course.id}`} className={cl.course__link}>
				{course.previewImage ? (
					<picture className={cl.course__image}>
						<img src={course.previewImage} alt='previewImage' />
					</picture>
				) : null}


				<header className={cl.course__header}>
					<h3 className={cl.course__title}>{course.title}</h3>
					{!course.previewImage && course.reviewStatus.status === 'approved' ? (
						<button className={cl.course__favorite}>
							<FavoriteIcon />
						</button>
					) : null}
					{course.reviewStatus.status === 'pending' || course.reviewStatus.status === 'rejected' ? (
						<Button additionalClasses={{background: 'transparent', editBtn: true}} className={cl.course__editBtn}><span></span></Button>
					) : null}
				</header>

				{course.shortDesc ? <p className={cl.course__description}>{course.shortDesc}</p> : null}

				{course.stats ? <div className={cl.course__statistics}>
					{course.stats.ratingAvg ?<div className={cl.course__rating}>
						<img src={rating} alt='Рейтинг курса' />
						<span>{course.stats.ratingAvg}</span>
					</div> : null}

					{course.avgDuration ? <div className={cl.course__time}>
						<img src={time} alt='Время курса' />
						<span>{course.avgDuration}ч</span>
					</div> : null}

					{course.stats.enrollmentsCount ? <div className={cl.course__countUsers}>
						<img src={countUsers} alt='Количество людей на курсе' />
						<span>{course.stats.enrollmentsCount}</span>
					</div> : null}
				</div> : null}

				<p className={cl.course__cost}>
					{course.price ? !+course.price ? 'Бесплатно' : `${course.price} рублей` : null}
				</p>
			</Link>
		</div>
	)
}

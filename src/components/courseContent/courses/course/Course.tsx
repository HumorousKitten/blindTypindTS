import { FC } from 'react'
import { ICourse } from '../../../../types/types'
import { FavoriteIcon } from '../../../../UI/icons/FavoriteIcon'

import cl from './_course.module.scss'

import { Link } from 'react-router-dom'
import countUsers from '../../../../assets/img/icons/countUsers.svg'
import rating from '../../../../assets/img/icons/rating.svg'
import time from '../../../../assets/img/icons/time.svg'

interface ICourseProps {
	course: ICourse
}

export const Course:FC<ICourseProps> = ({ course }) => {
	return (
		<div
			className={`${cl.course} ${
				course.fromWhom === 'admin' ? cl.adminCourse : ''
			}`}
		>
			<Link to={`/courses/${course.slug}/${course.id}`} className={cl.course__link}>
				{course.previewImage ? (
					<picture className={cl.course__image}>
						<img src={course.previewImage} alt='previewImage' />
					</picture>
				) : null}


				<header className={cl.course__header}>
					<h3 className={cl.course__title}>{course.title}</h3>
					{!course.previewImage ? (
						<button className={cl.course__favorite}>
							<FavoriteIcon />
						</button>
					) : null}
				</header>

				<p className={cl.course__description}>{course.shortDesc}</p>

				<div className={cl.course__statistics}>
					<div className={cl.course__rating}>
						<img src={rating} alt='Рейтинг курса' />
						<span>{course.stats.ratingAvg}</span>
					</div>

					<div className={cl.course__time}>
						<img src={time} alt='Время курса' />
						<span>{course.avgDuration}ч</span>
					</div>

					<div className={cl.course__countUsers}>
						<img src={countUsers} alt='Количество людей на курсе' />
						<span>{course.stats.enrollmentsCount}</span>
					</div>
				</div>

				<p className={cl.course__cost}>
					{!+course.price ? 'Бесплатно' : `${course.price} рублей`}
				</p>
			</Link>
		</div>
	)
}

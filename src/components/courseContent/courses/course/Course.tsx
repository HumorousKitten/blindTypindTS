import { FavoriteIcon } from '../../../../UI/icons/FavoriteIcon'

import cl from './_course.module.scss'

import { Link } from 'react-router-dom'
import countUsers from '../../../../assets/img/icons/countUsers.svg'
import rating from '../../../../assets/img/icons/rating.svg'
import time from '../../../../assets/img/icons/time.svg'

export const Course = ({ course }) => {
	return (
		<div
			className={`${cl.course} ${
				course.fromWhom === 'admin' ? cl.adminCourse : ''
			}`}
		>
			<Link to={`/courses/${course.id}`} className={cl.course__link}>
				{course.image ? <picture className={cl.course__image}></picture> : null}

				<h3 className={cl.course__title}>{course.title}</h3>

				{!course.image ? <FavoriteIcon /> : null}

				<p className={cl.course__description}>{course.description}</p>

				<div className={cl.course__statistics}>
					<div className={cl.course__rating}>
						<img src={rating} alt='Рейтинг курса' />
						<span>{course.rating}</span>
					</div>

					<div className={cl.course__time}>
						<img src={time} alt='Время курса' />
						<span>{course.time}ч</span>
					</div>

					<div className={cl.course__countUsers}>
						<img src={countUsers} alt='Количество людей на курсе' />
						<span>{course.countOnCourse}</span>
					</div>
				</div>

				<p className={cl.course__cost}>
					{!course.cost ? 'Бесплатно' : `${course.cost} рублей`}
				</p>
			</Link>
		</div>
	)
}

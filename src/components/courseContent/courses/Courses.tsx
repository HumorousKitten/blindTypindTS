import React from 'react'
import { Course } from './course/Course'

import cl from './_courses.module.scss'

import { useQuery } from '@tanstack/react-query'
import prev_courses from '../../../assets/img/icons/arrow_left.svg'
import next_courses from '../../../assets/img/icons/arrow_right.svg'

import { Link } from 'react-router-dom'
import { server } from '../../../server/server'
import { useStore } from '../../../state/store'
import Button from '../../../UI/button/Button'

export const Courses = () => {
	const user_role = useStore(state => state.user_role)
	const [page, setPage] = React.useState<number>(1)

	const { data, isLoading, error } = useQuery({
		queryKey: ['courses', page],
		queryFn: () => server.getCourses(page),
	})

	return (
		<section className={cl.courses}>
			<h1 className={cl.courses__title}>Курсы слепой печати</h1>
			{data?.data.length ? (
				<div className={cl.courses__items}>
					{page !== 1 ? (
						<div
							className={`${cl.courses__paginate} ${cl.prev__course}`}
							onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						>
							<img src={prev_courses} alt='предыдущий курс' />
						</div>
					) : null}

					{data.data.map(item => (
						<Course course={item} key={item.id} user_role={user_role}/>
					))}

					{data ? (
						data.pages > page ? (
							<div
								className={`${cl.courses__paginate} ${cl.next__course}`}
								onClick={() => setPage(prev => Math.min(prev + 1, data.pages))}
							>
								<img src={next_courses} alt='следующий курс' />
							</div>
						) : null
					) : null}
				</div>
			) : null}
			{user_role !== 'student' && user_role !== 'moderator' ? (
				<Link to={'/create_course'}>
					<Button
						additionalClasses={{ background: 'blue' }}
						className={cl.courses__addBtn}
					>
						Новый курс
					</Button>
				</Link>
			) : null}
		</section>
	)
}

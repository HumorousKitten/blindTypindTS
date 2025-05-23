import React from 'react'
import { Course } from './course/Course'

import cl from './_courses.module.scss'

import prev_courses from '../../../assets/img/icons/arrow_left.svg'
import next_courses from '../../../assets/img/icons/arrow_right.svg'
import { useQuery } from '@tanstack/react-query'

import { server } from '../../../server/server'


function getCourses(page: number) {
	const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'

	return server.getCourses(page, token)
}

export const Courses = () => {
	const [page, setPage] = React.useState<number>(1)
	const { data, isLoading, error } = useQuery({
		queryKey: ['courses', page],
		queryFn: () => getCourses(page),
	})

	return (
		<section className={cl.courses}>
			<h1 className={cl.courses__title}>Курсы слепой печати</h1>
			<div className={cl.courses__items}>
				{page !== 1 ? (
					<div
						className={`${cl.courses__paginate} ${cl.prev__course}`}
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
					>
						<img src={prev_courses} alt='предыдущий курс' />
					</div>
				) : null}

				{data ? data.data.map(item => (
					<Course course={item} key = {item.id}/>
				)) : null}

				{data ? data.pages > page ? (
					<div
						className={`${cl.courses__paginate} ${cl.next__course}`}
						onClick={() => setPage(prev => Math.min(prev + 1, data.pages))}
					>
						<img src={next_courses} alt='следующий курс' />
					</div>
				) : null : null}
			</div>
		</section>
	)
}

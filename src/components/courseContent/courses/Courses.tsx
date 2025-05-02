import React from 'react'
import { Course } from './course/Course'

import cl from './_courses.module.scss'

import prev_courses from '../../../assets/img/icons/arrow_left.svg'
import next_courses from '../../../assets/img/icons/arrow_right.svg'

const courses = [
	{
		id: 1,
		favorite: null,
		image: '',
		title: `Базовые курс слепой печати: основы и положение рук.`,
		description: `Курс предназначен для начинающих и направлен на формирования базовых навыков слепой печати.\n\nУчащиеся познакомят с\nправильной посадкой, постановкой рук и расположением пальцев\nна клавиатуре.`,
		rating: 4.9,
		time: 1,
		countOnCourse: 3099,
		cost: 0,
		fromWhom: 'admin', // или user
	},

	{
		id: 2,
		favorite: false,
		image: '',
		title: `Моторная адаптация и мышечная память`,
		description: `Упражнения фокусируются на домашних рядах и постепенной автоматизации движений пальцев.`,
		rating: 4.8,
		time: 12,
		countOnCourse: 1405,
		cost: 0,
		fromWhom: 'user',
	},

	{
		id: 3,
		favorite: false,
		image: '',
		title: `Ориентация на клавиатуре`,
		description: `Включает упражнения на верхний и нижний ряды, а также символы.`,
		rating: 4.3,
		time: 22,
		countOnCourse: 342,
		cost: 0,
		fromWhom: 'user',
	},

	{
		id: 4,
		favorite: false,
		image: '',
		title: `Высокая точность и контроль ошибок`,
		description: `Развитие точности ввода, минимизация опечаток и формирование устойчивыз сенсомоторных связей.`,
		rating: 3.8,
		time: 11,
		countOnCourse: 990,
		cost: 200,
		fromWhom: 'user',
	},

	{
		id: 5,
		favorite: true,
		image: '',
		title: `Когнитивная автоматизация`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 6,
		favorite: true,
		image: '',
		title: `Когнитивная автома`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 7,
		favorite: true,
		image: '',
		title: `Когнитивная`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 8,
		favorite: true,
		image: '',
		title: `Когнитивная автома`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 9,
		favorite: true,
		image: '',
		title: `Когнитивная`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 10,
		favorite: true,
		image: '',
		title: `Когнитивная автома`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 11,
		favorite: true,
		image: '',
		title: `Когнитивная`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},

	{
		id: 12,
		favorite: true,
		image: '',
		title: `Когнитивная`,
		description: `Ускорение печати за счет снижения когнитивное нагрузки. Ученики переходят от осознанного контроля к интуитивному вводу.`,
		rating: 2.1,
		time: 23,
		countOnCourse: 12,
		cost: 1199,
		fromWhom: 'user',
	},
]

export const Courses = () => {
	const [page, setPage] = React.useState<number>(1)
	const totalFirstPage = 5
	const isFirstPage = page === 1
	const restCourses = courses.length - totalFirstPage
	const restPages = Math.ceil(Math.max(0, restCourses) / 6)
	const lastPage = 1 + restPages
	const firstCourse = isFirstPage ? 0 : totalFirstPage + (page - 2) * 6

	const lastCourse = isFirstPage ? totalFirstPage : firstCourse + 6

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

				{courses.slice(firstCourse, lastCourse).map(item => (
					<Course course={item} />
				))}

				{lastPage > page ? (																								
					<div
						className={`${cl.courses__paginate} ${cl.next__course}`}
						onClick={() => setPage(prev => Math.min(prev + 1, lastPage))}
					>
						<img src={next_courses} alt='следующий курс' />
					</div>
				) : null}
			</div>
		</section>
	)
}

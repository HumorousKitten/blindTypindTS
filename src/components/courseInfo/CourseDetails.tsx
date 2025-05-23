import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from '../../server/server'
import { Wrapper } from '../wrapper/Wrapper'
import cl from './_courseDetails.module.scss'

import countUsers from '../../assets/img/icons/countUsers.svg'
import time from '../../assets/img/icons/time.svg'
import rating from '../../assets/img/icons/rating.svg'
import Button from '../../UI/button/Button'

function getCourseDetail(course_id: number) {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'
	return server.getCourseDetail(course_id, token)
}

function checkSubscribeCourse(course_id: number) {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'
	return server.checkSubscribeCourse(course_id, token)
}

export const CourseDetails = () => {
	const navigate = useNavigate()
	const { slug, id } = useParams()

	const courseDetail = useQuery({
		queryKey: ['courses/courseInfo', slug, id],
		queryFn: () => getCourseDetail(+(id as string)),
	})

	const checkSubscribe = useQuery({
		queryKey: ['courses/subscribe', slug, id],
		queryFn: () => checkSubscribeCourse(+(id as string))
	})

	const mutation = useMutation({
		mutationFn: ({course_id, token}: {course_id: number, token: string}) => server.subscribeOnCourse(course_id, token),
		onSuccess: () => {
			navigate(`/level_page/${slug}/${id}`)
		},
		onError: (error) => {
			console.log('Error: ',  error.message)
		}
	})

	function handleSubscribe() {
		mutation.mutate({course_id: +(id as string), token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'})
	}

	return (
		<main className={cl.main}>
			<Wrapper wrapperSize={'regularSize'}>
				<div className={cl.course__content}>
					<button className={cl.course__content__closeBtn}></button>
					{courseDetail.data ? (
						<section className={cl.course__content__info}>
							<h1 className={cl.course__content__title}>{courseDetail.data.title}</h1>
							<h2 className={cl.course__content__subtitle}>
								Чему вы научитесь
							</h2>
							<p>{courseDetail.data.details.will_learn}</p>

							<h2 className={cl.course__content__subtitle}>О курсе</h2>
							<div
								dangerouslySetInnerHTML={{ __html: courseDetail.data.details.about_course }}
							></div>

							<h2 className={cl.course__content__subtitle}>
								Для кого этот курс
							</h2>
							<p>{courseDetail.data.details.for_whom}</p>
						</section>
					) : null}
					{courseDetail.data ? (
						<section className={cl.course__content__action}>
							<picture>
								<img src={courseDetail.data.details.preview_image} alt="preview_image" />
							</picture>

							<Button additionalClasses = {{background: 'blue'}} onClick = {!checkSubscribe.data ? handleSubscribe : () => navigate(`/level_page/${slug}/${id}`)}>{!checkSubscribe.data ? 'Записаться на курс' : 'Перейти в курс'}</Button>
							<Button additionalClasses = {{background: 'transparent'}} >{!courseDetail.data.favorite ? 'Добавить в избранное' : 'Убрать  из избранного'}</Button>

							<p className={cl.course__content__action__cost}>{!+courseDetail.data.price ? 'Бесплатно' : courseDetail.data.price}</p>

							<div className={cl.course__content__action__stats}>
								<p>
									<img src={time} alt="Время обучения" />
									<span>Время обучения:</span>
									{courseDetail.data.avgDuration}
								</p>
								<p>
									<img src={countUsers} alt="Человек прошло" />
									<span>Человек прошло:</span>
									{courseDetail.data.stats.enrollmentsCount}
								</p>
								<p>
									<img src={rating} alt="Оценка" />
									<span>Оценка:</span>
									{courseDetail.data.stats.ratingAvg}
								</p>
							</div>
						</section>
					) : null}
				</div>
			</Wrapper>
		</main>
	)
}

import { useQuery } from '@tanstack/react-query'
import { server } from '../../server/server'

import cl from './_LevelssBlock.module.scss'

import exit from '../../assets/img/icons/close cross.svg'
import { LevelModule } from './LevelModule/LevelModule'
import { useNavigate, useParams } from 'react-router-dom'
import { FC } from 'react'

async function getUserLevelQuery(course_id: number) {
	// const token = server.readCookie('token')
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'
	if (!token) return

	return await server.getCourseTasks(course_id, token)
}

interface ILevelBlock {
	openModal: (value: boolean) => void
	setLevelId: (value: number) => void
}

export const LevelsBlock: FC<ILevelBlock> = ({openModal, setLevelId}) => {
	const { slug, id } = useParams()  

	const { data, isLoading } = useQuery({
		queryKey: ['levels_page', slug, id],
		queryFn: () => getUserLevelQuery(+(id as string)),
	})
	const navigate = useNavigate()

	return (
		<div className={cl.LevelsBlock}>
			<div className={cl.titleBlock}>
				<h1>{data?.main_title}</h1>
				<img
					src={exit}
					width='24'
					height='24'
					onClick = {() => navigate('/')}
				/>
			</div>
			{(!isLoading && data) ? data.modules.map(item => <LevelModule module={item} key={item.id} openModal = {openModal} setLevelId={setLevelId}/>) : null}
		</div>
	)
}


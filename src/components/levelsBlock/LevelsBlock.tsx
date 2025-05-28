import { useQuery } from '@tanstack/react-query'
import { server } from '../../server/server'

import cl from './_LevelssBlock.module.scss'

import exit from '../../assets/img/icons/close cross.svg'
import { LevelModule } from './LevelModule/LevelModule'
import { useNavigate, useParams } from 'react-router-dom'
import { FC } from 'react'


interface ILevelBlock {
	openModal: (value: boolean) => void
	setLevelId: (value: number) => void
}

export const LevelsBlock: FC<ILevelBlock> = ({openModal, setLevelId}) => {
	const { slug, id } = useParams()  

	const { data, isLoading } = useQuery({
		queryKey: ['levels_page', slug, id],
		queryFn: () => server.getCourseTasks(+(id as string)),
	})
	const navigate = useNavigate()
	
	if(!slug || !id) return null

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
			{(!isLoading && data) ? data.modules.map(item => <LevelModule module={item} key={item.id} openModal = {openModal} setLevelId={setLevelId} slug={slug}/>) : null}
		</div>
	)
}


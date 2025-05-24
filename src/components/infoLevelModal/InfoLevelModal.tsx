import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Wrapper } from '../wrapper/Wrapper'
import { VideoPlayer } from '../../UI/videoPlayer/VideoPlayer'
import { Modal } from '../../UI/Modal/Modal'
import Button from '../../UI/button/Button'
import { server } from '../../server/server'
import cl from './_infoLevelModal.module.scss'


interface InfoLevelModalInterface {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	levelId: number
}

function getInfo(levelId: number){
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NzIzMDQyMywiZXhwIjoxNzQ5ODIyNDIzfQ.JYqqbMS6TlDZPLHnSQE-wKHHYMZa8JiAh0cw91lX57k'

	return server.getLevelInfo(levelId, token)
}


export const InfoLevelModal: FC<InfoLevelModalInterface> = ({ isOpen, setIsOpen, levelId }) => {
	const {data, isLoading, error} = useQuery({
		queryKey: ['levels', levelId],
		queryFn: () => getInfo(levelId)
	})

	console.log(data)

	return (
		<Modal isOpen={isOpen} setIsOpen = {setIsOpen}>
			<section className={cl.infoLevelSection}>
				<Wrapper wrapperSize={'regularSize'}>
					{/* примерная структура из бд */}
					<div
						onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
						className={cl.modalContent}
					>
						<Button additionalClasses={{background: "transparent", closeBtn: true}} onClick={() => setIsOpen(false)}></Button>
						<h1>{data ? data.title : null}</h1>
						{data?.levelInfo && data.levelInfo.description ? <div dangerouslySetInnerHTML={{__html: data.levelInfo.description}}></div> : null}
						
						
						{data?.levelInfo && data.levelInfo.video_url ? <VideoPlayer src={data.levelInfo.video_url}/>: null}
						<Button additionalClasses={{background: 'blue', modalPrimary: true}}>{data?.type === 'lecture' ? 'Далее' : 'Практика'}</Button>
					</div>
				</Wrapper>
			</section>
		</Modal>
	)
}

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { server } from '../../server/server'

import cl from './_bestResults.module.scss'

function getUserBestResult() {
	const token = server.readCookie('token')
	if (!token) return
	const data = server.getBestResult(token)
	return data
}

export const BestResults = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['bestResults'],
		queryFn: getUserBestResult,
	})

	React.useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<section className={cl.bestResultSection}>
			<p className={cl.bestResultLevel}>
				Ваши лучшие результаты:{' '}
				{isLoading ? (
					'Loading...'
				) : (
					<span>Уровень {!data.level ? data.level : data.level + '.' + data.sublevel}</span>
				)}
			</p>
			<div className={cl.bestResults}>
				<div className={cl.accuracy}>
					<span>
						{data ? data.accuracy : ''}
						<span>%</span>
					</span>
					<span>accuracy</span>
				</div>
				<div className={cl.charPerMinutes}>
					<span>{data ? data.cpm : ''}</span>
					<span>cpm</span>
				</div>
				<div className={cl.wordPerMinutes}>
					<span>{data ? data.wpm : ''}</span>
					<span>wpm</span>
				</div>
			</div>
		</section>
	)
}

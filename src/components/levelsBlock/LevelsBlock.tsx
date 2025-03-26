import { useQuery } from '@tanstack/react-query'
import { server } from '../../server/server'

import cl from './_LevelssBlock.module.scss'

import exit from '../../assets/img/icons/close cross.svg'
import { LevelBlock} from './LevelBlock/LevelBlock'
import { useNavigate } from 'react-router-dom'

async function getUserLevelQuery() {
	const token = server.readCookie('token')
	if (!token) return
	return await server.getUserLevels(token)
}

export const LevelsBlock = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['levels'],
		queryFn: getUserLevelQuery,
	})
	const navigate = useNavigate()

	const levels: readonly string[] = [
		'Test',
		'F, J and U Keys',
		'D, E, K and I Keys',
		'S, W, L and O Keys',
		'G, T, H and Y Keys',
		'A, Q and P Keys',
		'R, B and N Keys',
		'V, M and C Keys',
		'X and Z Keys',
	]

	return (
		<div className={cl.LevelsBlock}>
			<div className={cl.titleBlock}>
				<h5>Выбор уровня</h5>
				<img
					src={exit}
					width='24'
					height='24'
					onClick = {() => navigate('/')}
				/>
			</div>
			{!isLoading ? levels.map((item, index) => {
				return (
					<LevelBlock
						key={index}
						index={index}
						value={item}
						completedSubLevels={data ? data : []}
					/>
				)
			}) : null}
		</div>
	)
}

// export const LevelsBlock = () => {
//   // type getUserLevel = (token: string) => Promise<{method: string, token: string}>

// 	const levels: readonly string[] = [
// 		'Test',
// 		'F, J and U Keys',
// 		'D, E, K and I Keys',
// 		'S, W, L and O Keys',
// 		'G, T, H and Y Keys',
// 		'A, Q and P Keys',
// 		'R, B and N Keys',
// 		'V, M and C Keys',
// 		'X and Z Keys',
// 	]

//   interface ICompletedSubLevels {
//     level?: string
//     subLevel?: string
//   }

// 	const [completedSubLevels, setCompletedSubLevels] = React.useState<ICompletedSubLevels[]>([])

//   React.useEffect(() => {
//     (async () => {
// 			const token = server.readCookie('token')
// 			if(!token) return
//       const completeSubLevels = await server.getUserLevels(token)
// 			setCompletedSubLevels(completeSubLevels)
// 		})()
// 	}, [])

//   function levelBlock(item: string, index: number): JSX.Element {
// 		if (index === 0) {
// 			return (
// 				<MemoizedLevelBlock
// 					index={index}
// 					key={index}
// 					value='Test'
// 					svg={<img src={rightArrow} width='24' height='24' />}
// 					style={{ marginBottom: '36px' }}
// 				/>
// 			)
// 		}

// 		return (
// 			<MemoizedLevelBlock
// 				key={index}
// 				index={index}
// 				value={item}
// 				completedSubLevels={completedSubLevels}
// 			/>
// 		)
// 	}

// 	return (
// 		<div className={cl.LevelsBlock}>
// 			<div className={cl.titleBLlock}>
// 				<h5>Выбор уровня</h5>
// 				<img
// 					src={exit}
// 					width='24'
// 					height='24'
// 					style={{ position: 'relative', left: '255px' }}
// 				/>
// 			</div>
// 			{levels.map((item, index) => {
// 				return levelBlock(item, index)
// 			})}
// 		</div>
// 	)
// }

import React from 'react'

import { MemoizedLevelBlock } from "./LevelBlock/LevelBlock";
import { server } from '../../server/server';

import exit from '../../assets/img/icons/close cross.svg'
import rightArrow from '../../assets/img/icons/double.svg'
import cl from './_LevelssBlock.module.scss'

export const LevelsBlock = () => {
  type getUserLevel = (token: string) => Promise<{method: string, token: string}>
	const levels: readonly string[] = [
		'Test >>',
		'F, J and U Keys',
		'D, E, K and I Keys',
		'S, W, L and O Keys',
		'G, T, H and Y Keys',
		'A, Q and P Keys',
		'R, B and N Keys',
		'V, M and C Keys',
		'X and Z Keys',
	]

  interface ICompletedSubLevels {
    level?: string
    subLevel?: string
  }

	const [completedSubLevels, setCompletedSubLevels] = React.useState<ICompletedSubLevels[]>([])


  React.useEffect(() => {
    (async () => {
      const completeSubLevels = await server.getUserLevels('fc78e1a39a36e88d5f65f49032bf2bc2')
			setCompletedSubLevels(completeSubLevels)
		})()
	}, [])

  function levelBlock(item: string, index: number): JSX.Element {
		if (index === 0) {
			return (
				<MemoizedLevelBlock
					index={index}
					key={index}
					value='Test'
					svg={<img src={rightArrow} width='24' height='24' />}
					style={{ marginBottom: '36px' }}
				/>
			)
		}

		return (
			<MemoizedLevelBlock
				key={index}
				index={index}
				value={item}
				completedSubLevels={completedSubLevels}
			/>
		)
	}

	return (
		<div className={cl.LevelsBlock}>
			<div className={cl.titleBLlock}>
				<h5>Выбор уровня</h5>
				<img
					src={exit}
					width='24'
					height='24'
					style={{ position: 'relative', left: '255px' }}
				/>
			</div>
			{levels.map((item, index) => {
				return levelBlock(item, index)
			})}
		</div>
	)
}

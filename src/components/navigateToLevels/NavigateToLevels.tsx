import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/button/Button';
import { useStore } from '../../state/store';

import cl from './_navigateToLevels.module.scss'

import bookLevel from '../../assets/img/icons/level_book.svg'

interface INavigateToLevelsProps{
	mc?: 'mc'
}

export const NavigateToLevels: FC<INavigateToLevelsProps> = ({mc}) => {
	const {level, subLevel} = useStore(state => state.simulatorLevel)

	return (
		<Button additionalClasses={{display: 'block', background: 'transparent', margin: mc ? 'auto' : undefined}} type={'button'}>
			<Link className={cl.navigateToLevels} to={'/levels'}>
				<img src={bookLevel} alt="levelPageIcon" />
				<span className={cl.level}>Уровень</span>
				<span className={cl.level}>{!level ? level : level + '.' + subLevel}</span>
			</Link>
		</Button>
	);
}
 

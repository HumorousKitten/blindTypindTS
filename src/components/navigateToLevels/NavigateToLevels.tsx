import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/button/Button';
import cl from './_navigateToLevels.module.scss'

import bookLevel from '../../assets/img/icons/level_book.svg'

interface INavigateToLevelsProps{
	mc?: 'mc'
	slug: string
	courseId: number
	title: number
}

export const NavigateToLevels: FC<INavigateToLevelsProps> = ({mc, slug, courseId, title}) => {

	

	return (
		<Button additionalClasses={{display: 'block', background: 'transparent', margin: mc ? 'auto' : undefined}} type={'button'}>
			<Link className={cl.navigateToLevels} to={`/level_page/${slug}/${courseId}`}>
				<img src={bookLevel} alt="levelPageIcon" />
				<span className={cl.level}>{title}</span>
			</Link>
		</Button>
	);
}
 

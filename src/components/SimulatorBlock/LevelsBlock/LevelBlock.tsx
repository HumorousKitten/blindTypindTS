import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import levelBook from '../../../assets/img/icons/level_book.svg'
import cl from './_LevelBlock.module.scss'

export const LevelBlock = () => {
	const navigate = useNavigate()
	const {level, sublevel} = useSelector((state: RootState) => state.simulatorStrAndLevel)
	return (
		<div className={cl.LevelBlock} onClick={() => navigate('/levels')}>
			<img src={levelBook} width='20' height='20' className={cl.svgBook} />
			<span>Уровень {level}{(sublevel) && "."+sublevel}</span>
		</div>
	)
}

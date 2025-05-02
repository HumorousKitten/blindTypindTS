import { Input } from '../../../UI/input/Input'
import favorites from '../../../assets/img/icons/favorites.svg'

import cl from './_courseFilter.module.scss'


export const CourseFilter = () => {
	return (
		<section className={cl.filter}>
			<label className={cl.filter__searchField}>
				<Input placeholder={'Название курса'} type={'search'}/>
			</label>
			
			<div className={cl.filter__controls}>
				<label className={cl.filter__language}>
					<select name="language" aria-label="Выберите язык">
						<option value="any">На любом языке</option>
					</select>
				</label>

				<label className={cl.filter__cost}>
					<Input placeholder={'стоимость'} type={'checkbox'}/>
					<span>Бесплатные</span>
				</label>
			</div>

			<div className={cl.filter__favorites}>
				<img src={favorites} alt="favorites" />
				<span>Избранные</span>
			</div>
			
		</section>
	);
}
 

import { Wrapper } from '../wrapper/Wrapper'
import { CourseFilter } from './courseFilter/CourseFilter';
import { Courses } from './courses/Courses';

import cl from './_courseContent.module.scss'

export const CourseContent = () => {
	return (
		<main className={cl.main}>
			<Wrapper wrapperSize={'thinSize'}>
				<CourseFilter />
				<Courses />
			</Wrapper>
		</main>
	);
}

import {React, FC} from 'react';
import { ICourseModule } from '../../../types/types';
import { LevelBlock } from '../LevelBlock/LevelBlock';
import cl from './_levelModule.module.scss';

interface ILevelModuleProps {
	module: ICourseModule
	openModal: (value: boolean) => void
}

export const LevelModule: FC<ILevelModuleProps> = ({module, openModal}) => {
	return (
		<div className={cl.module}>
			<h3>{module.title}</h3>
			{module.courseLevels.length ? module.courseLevels.map(item => <LevelBlock courseLevel={item} key={item.id} openModal={openModal}/>) : null}
		</div>
	);
}
 

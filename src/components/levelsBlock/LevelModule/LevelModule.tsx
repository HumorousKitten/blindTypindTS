import {React, FC} from 'react';
import { ICourseModule } from '../../../types/types';
import { LevelBlock } from '../LevelBlock/LevelBlock';
import cl from './_levelModule.module.scss';

interface ILevelModuleProps {
	module: ICourseModule
	openModal: (value: boolean) => void
	setLevelId: (value: number) => void
}

export const LevelModule: FC<ILevelModuleProps> = ({module, openModal, setLevelId}) => {
	return (
		<div className={cl.module}>
			<h3>{module.title}</h3>
			{module.courseLevels.length ? module.courseLevels.map(item => <LevelBlock courseLevel={item} key={item.id} openModal={openModal} setLevelId={setLevelId}/>) : null}
		</div>
	);
}
 

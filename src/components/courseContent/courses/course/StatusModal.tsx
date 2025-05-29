import { ReactNode, FC } from 'react'
import cl from './_course.module.scss'

interface IStatusModal {
	children: ReactNode
}

export const StatusModal: FC<IStatusModal> = ({children}) => {
	return (
		<div className={cl.backdropModal}>
			{children}
		</div>
	);
}

import { FC, ReactNode } from 'react'
import cl from './_wrapper.module.scss'


interface IWrapperProps {
	children: ReactNode
}

export const Wrapper: FC<IWrapperProps> = ({children}) => {
	return (
		<div className={cl.wrapper}>
			{children}
		</div>
	);
}
 


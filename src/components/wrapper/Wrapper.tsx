import { FC, ReactNode } from 'react'
import cl from './_wrapper.module.scss'


interface IWrapperProps {
	children: ReactNode
	wrapperSize: 'thinSize' | 'regularSize' | 'bigSize'
}

export const Wrapper: FC<IWrapperProps> = ({children, wrapperSize}) => {
	return (
		<div className={cl[wrapperSize]}>
			{children}
		</div>
	);
}
 


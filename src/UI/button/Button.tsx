import { FC, ReactNode } from 'react'
import { Loader } from '../loader/Loader'
import cl from './_button.module.scss'

interface IAdditionClasses {
	wrongAuth: boolean
}

interface IButton {
	children: ReactNode
	type?: 'button' | 'reset' | 'submit'
	additionalClasses?: IAdditionClasses
	isLoading: boolean
	// onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({
	children,
	type = 'submit',
	additionalClasses,
	isLoading
}) => {
	return (
		<button
			type={type}
			className={`${cl.button} ${additionalClasses?.wrongAuth ? cl.wrongAuth : ''}`}
		>
			{isLoading ?  'Loading...' : children}
		</button>
	)
}

export default Button

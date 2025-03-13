import { FC, ReactNode } from 'react'
import cl from './_button.module.scss'

interface IAdditionClasses {
	wrongAuth: boolean
}

interface IButton {
	children: ReactNode
	type?: 'button' | 'reset' | 'submit'
	additionalClasses?: IAdditionClasses
	// onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({
	children,
	type = 'submit',
	additionalClasses,
}) => {
	return (
		<button
			type={type}
			className={`${cl.button} ${additionalClasses?.wrongAuth ? cl.wrongAuth : ''}`}
		>
			{children}
		</button>
	)
}

export default Button

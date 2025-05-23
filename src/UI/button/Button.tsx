import { FC, ReactNode } from 'react'
import cl from './_button.module.scss'

interface IAdditionClasses {
	wrongAuth?: boolean
	display?: 'block'
	background: 'blue' | 'transparent'
	margin?: 'auto'
	closeBtn?: boolean
}

interface IButton {
	children?: ReactNode
	type?: 'button' | 'reset' | 'submit'
	additionalClasses?: IAdditionClasses
	isLoading?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({
	children,
	type = 'submit',
	additionalClasses,
	isLoading,
	onClick
}) => {
	return (
		<button
			type={type}
			className={`
					${cl.button} 
					${additionalClasses?.wrongAuth ? cl.wrongAuth : ''}
					${additionalClasses?.display ? cl.displayBlock : ''}
					${
						additionalClasses?.background === 'blue'
							? cl.backgroundColorBlue
							: cl.backgroundColorTransparent
					}
					${additionalClasses?.margin === 'auto' ? cl.mc : ''}
					${additionalClasses?.closeBtn ? cl.closeBtn : ''}
				`}
			onClick = {onClick}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}

export default Button

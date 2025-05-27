import { FC, ReactNode } from 'react'
import cl from './_button.module.scss'

interface IAdditionClasses {
	wrongAuth?: boolean
	display?: 'block'
	background: 'blue' | 'transparent' | 'red'
	margin?: 'auto'
	closeBtn?: boolean
	modalPrimary?: boolean
	border?: boolean
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
	onClick,
}) => {
	return (
		<button
			type={type}
			className={`
					${cl.button} 
					${additionalClasses?.display ? cl.displayBlock : ''}
					${
						additionalClasses?.background === 'blue'
							? cl.backgroundColorBlue : additionalClasses?.background === 'red' ? cl.wrongAuth : cl.backgroundColorTransparent
					}
					${additionalClasses?.margin === 'auto' ? cl.mc : ''}
					${additionalClasses?.closeBtn ? cl.closeBtn : ''}
					${additionalClasses?.modalPrimary ? cl.modalPrimary : ''}
					${additionalClasses?.border ? cl.blueBorder : ''}
				`}
			onClick={onClick}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}

export default Button

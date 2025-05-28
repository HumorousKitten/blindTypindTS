import { FC, ReactNode } from 'react'
import clsx from 'clsx'

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
	additionalClasses: IAdditionClasses
	className?: string
	isLoading?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({
	children,
	type = 'submit',
	additionalClasses,
	className,
	isLoading,
	onClick,
}) => {
	const colorMap = {
		blue: cl.backgroundColorBlue,
		red: cl.wrongAuth,
		transparent: cl.backgroundColorTransparent
	}

	const classes = clsx(
		additionalClasses?.display && cl.displayBlock,
		colorMap[additionalClasses.background],
		additionalClasses?.margin && cl.mc,
		additionalClasses?.closeBtn && cl.closeBtn,
		additionalClasses?.modalPrimary && cl.modalPrimary,
		additionalClasses?.border && cl.blueBorder,
		className,
	)

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}

export default Button

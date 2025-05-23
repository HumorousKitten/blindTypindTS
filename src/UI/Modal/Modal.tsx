import React from 'react'
import { FC } from 'react'

import cl from './_modal.module.scss'

interface IModal {
	isOpen: boolean
	size?: 'sm' | 'md' | 'lg'
	children: React.ReactNode
	setIsOpen: (value: boolean) => void
}

export const Modal: FC<IModal> = ({isOpen, children, setIsOpen}) => {
	if(!isOpen) return null

	// const classSize = size ? {
	// 	sm: 'small_size_modal',
	// 	md: 'middle_size_modal',
	// 	lg: 'large_size_modal'
	// }[size] : ''

	return (
		<div className={cl.backdrop} onClick={() => setIsOpen(false)}>
			{children}
		</div>
	);
}
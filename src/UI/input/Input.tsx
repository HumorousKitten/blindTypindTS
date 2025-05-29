import clsx from 'clsx'
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import cl from './_input.module.scss'

interface InputInterface {
	field?: ControllerRenderProps<any, string>
	type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'search'
	placeholder: string
	error?: boolean
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputInterface>(
	({ field, type, placeholder, error, className, onChange }, ref) => {
		const classes = clsx(
			cl.input,
			error ? cl.borderError : cl.defaultBorder,
			className
		)

		return (
			<input
				type={type}
				placeholder={placeholder}
				className={classes}
				ref={ref ?? field?.ref}
				onChange={e => {
					field?.onChange?.(e)
					onChange?.(e)
				}}
				value={field?.value}
				onBlur={field?.onBlur}
				name={field?.name}
			/>
		)
	}
)

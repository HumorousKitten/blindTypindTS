import cl from './_input.module.scss'
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'

interface InputInterface {
	field: ControllerRenderProps<any, string>
	type: 'text' | 'number' | 'email' | 'password'
	placeholder: string
}

export const Input = React.forwardRef<HTMLInputElement, InputInterface>(({field, type, placeholder}, ref) => {
	return (  
		<input type={type} placeholder={placeholder} className={cl.input} {...field} ref={ref}/>
	);
})
 
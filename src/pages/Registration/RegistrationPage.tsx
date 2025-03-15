import React from 'react'
import { Form as RegisterForm } from '../../components/form/Form'
import cl from './_register.module.scss'
import { server } from '../../server/server'


export const RegisterPage = () => {
	// async function registerUser(email: string, password: string ,login: string) {
	// 	const data = await server.registration(login, password, email)
	// 	console.log(data)
	// 	setResponse(data)
	// }


	return (
		<div className={cl.register}>
			<h2>Регистрация</h2>
			<RegisterForm />			
		</div>
	)
}

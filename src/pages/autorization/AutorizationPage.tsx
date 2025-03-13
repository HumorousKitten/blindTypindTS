import React from 'react'
import { Form as AuthForm } from '../../components/form/Form'
import cl from './_auth.module.scss'
import { server } from '../../server/server'


export const AuthorizationPage = () => {
	const [response, setResponse] = React.useState<boolean | string | null>(null)

	async function authUser(email: string, password: string) {
		const data = await server.login(email, password)
		setResponse(data)
	}


	return (
		<div className={cl.auth}>
			<h2>Добро пожаловать!</h2>
			<AuthForm sendToServer={authUser} response={response} />			
		</div>
	)
}

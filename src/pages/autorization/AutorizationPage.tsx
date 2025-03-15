import { Form as AuthForm } from '../../components/form/Form'
import cl from './_auth.module.scss'

export const AuthorizationPage = () => {
	return (
		<div className={cl.auth}>
			<h2>Добро пожаловать!</h2>
			<AuthForm />			
		</div>
	)
}

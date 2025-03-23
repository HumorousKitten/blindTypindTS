import { Form as AuthForm } from '../../components/form/Form'
import { RunningCat } from '../../UI/runningCat/RunningCat'

import cl from './_auth.module.scss'

export const AuthorizationPage = () => {
	return (
		<div className={cl.auth}>
			<div className={cl.authContent}>
				<RunningCat classNames={{position: 'absolute'}} widthPx={427} coordPosition={{right: -130, bottom: -120}} isRunning={true} heightPx={411}/>
				<h2>Добро пожаловать!</h2>
				<AuthForm />			
			</div>
		</div>
	)
}

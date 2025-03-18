import React from 'react'
import { Form as RegisterForm } from '../../components/form/Form'
import cl from './_register.module.scss'
import { server } from '../../server/server'
import { RunningCat } from '../../UI/runningCat/RunningCat'

export const RegisterPage = () => {

	return (
		<div className={cl.register}>
			<div className={cl.registerContent}>
				<RunningCat classNames={{position: 'absolute'}} widthPx={427} coordPosition={{right: -130, bottom: -50}}/>
				<h2>Регистрация</h2>
				<RegisterForm />			
			</div>
		</div>
	)
}

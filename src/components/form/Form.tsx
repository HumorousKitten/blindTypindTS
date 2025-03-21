
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, Link } from 'react-router-dom'

import Button from '../../UI/button/Button'

import { inputConfigs } from '../../config/formConfig'

import { server } from '../../server/server'

import { IFormInputs } from '../../types/types'

import { useAuthMutation } from '../../hooks/useAuthMutation'

import { ControlledInput } from '../controlledInput/ControlledInput'

import cl from './_form.module.scss'

export const Form = () => {
	const location = useLocation().pathname.slice(1)
	
	const isAuthPage = location === 'auth'

	const {mutation, isSuccess} = useAuthMutation(isAuthPage)

	const isRegisterPage = location === 'register'
	const defaultRegister = isRegisterPage && isSuccess === null
	const successRegister = isRegisterPage && isSuccess
	const hasAuthError = isAuthPage && isSuccess === false
	const buttonText = isAuthPage
		? hasAuthError
			? 'Неверный логин или пароль'
			: 'Войти'
		: defaultRegister
		? 'Регистрация'
		: successRegister
		? 'Успешно..'
		: 'Пользователь уже существует'


	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormInputs>({
		defaultValues: {
			login: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
	})

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		if (!Object.keys(errors).length) {
			mutation.mutate(data)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				{inputConfigs(isAuthPage).map(
					({ name, type, placeholder, show, rules }) =>
						show ? (
							<ControlledInput
								key={name}
								name={name}
								control={control}
								type={type}
								placeholder={placeholder}
								regulations={rules}
								error={!!errors[name]}
								errorMessage={errors[name]?.message || ''}
							/>
						) : null
				)}
			</div>
			<Button
				additionalClasses={{
					wrongAuth: isSuccess === false,
				}}
				isLoading={mutation.isPending}
			>
				{buttonText}
			</Button>
			{location === 'auth' ? (
				<p className={cl.isAccount}>
					Еще нет аккаунта?
					<Link to='/register'>Зарегистрируйтесь</Link>
				</p>
			) : (
				<p className={cl.isAccount}>
					Уже есть аккаунт? <Link to='/auth'>Войдите здесь</Link>
				</p>
			)}
		</form>
	)
}

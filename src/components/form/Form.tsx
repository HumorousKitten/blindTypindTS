import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IFormInputs, InputNamesEnum } from '../../types/types'
import Button from '../../UI/button/Button'
import {
	emailPattern,
	maxLength,
	minLength,
} from '../../utils/formValidate/validate'
import { ControlledInput } from '../controlledInput/ControlledInput'
import cl from './_form.module.scss'
import { server } from '../../server/server'
import React from 'react'

export const Form = () => {
	const location = useLocation().pathname.slice(1)
	const navigate = useNavigate()
	const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null) 

	const mutation = useMutation<string | boolean, Error, IFormInputs>({
		mutationFn: async ({login, email, password}: IFormInputs) => 
			location === 'auth' ? server.login(email, password) : server.registration(login, password, email),
		onSuccess: (data) => {
			console.log('Ответ сервера: ', data)
			data ? setIsSuccess(true) : setIsSuccess(false)
			
			if(location === 'register' && data)
				setTimeout(() => navigate('/auth'), 500)
			if(location === 'auth' && data)
				navigate('/')
		},
	})

	const isAuthPage = location === 'auth'
	const isRegisterPage = location === 'register'
	const defaultRegister = isRegisterPage && isSuccess === null
	const successRegister = isRegisterPage && isSuccess
	const hasAuthError = isAuthPage && isSuccess === false
	const buttonText = isAuthPage
		? hasAuthError
			? 'Неверный логин или пароль'
			: 'Войти'
		: defaultRegister ? 'Регистрация' : successRegister ? 'Успешно..' : 'Пользователь уже существует' 

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
		if (!Object.keys(errors).length){
			mutation.mutate(data)
			console.log(mutation.data)
		}
	}

	// посмотреть рендеры после нажатия на кнопку
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				{location !== 'auth' ? (
					<ControlledInput
						name={InputNamesEnum.login}
						control={control}
						type='text'
						placeholder='Login'
						regulations={{
							required: true,
							minLength: minLength(6, 'Логин должен быть не менее 6 символов'),
							maxLength: maxLength(
								20,
								'Логин должен быть не более 20 символов'
							),
						}}
						error={errors.login ? true : false}
						errorMessage={errors.login ? errors.login.message : ''}
					/>
				) : null}
				<ControlledInput
					name={InputNamesEnum.email}
					control={control}
					type='email'
					placeholder='E-mail'
					regulations={{
						required: true,
						pattern: emailPattern,
					}}
					error={errors.email ? true : false}
					errorMessage={errors.email ? errors.email.message : ''}
				/>
				<ControlledInput
					name={InputNamesEnum.password}
					control={control}
					type='password'
					placeholder='Password'
					regulations={{
						required: true,
						minLength: minLength(3, 'Пароль должен быть не менее 3-х символов'),
						maxLength: maxLength(18, 'Пароль должен быть не более 18 символов'),
					}}
					error={errors.password ? true : false}
					errorMessage={errors.password ? errors.password.message : ''}
				/>
			</div>
			<Button
				additionalClasses={{
					wrongAuth: isSuccess === false 
				}}
				isLoading = {mutation.isPending}
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

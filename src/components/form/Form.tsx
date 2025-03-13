import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { IFormInputs, InputNamesEnum } from '../../types/types'
import Button from '../../UI/button/Button'
import {
	emailPattern,
	maxLength,
	minLength,
} from '../../utils/formValidate/validate'
import { ControlledInput } from '../controlledInput/ControlledInput'
import cl from './_form.module.scss'

interface IFormProps {
	sendToServer: ((email: string, password: string) => Promise<void>) | 
	((email: string, password: string, login: string) => Promise<void>);
	response: string | boolean | null
}

export const Form: FC<IFormProps> = ({ sendToServer, response }) => {
	const location = useLocation().pathname.slice(1)
	const isAuthPage = location === 'auth'
	const hasAuthError = isAuthPage && response === false
	const buttonText = isAuthPage
		? hasAuthError
			? 'Неверный логин или пароль'
			: 'Войти'
		: 'Зарегистрироваться'

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
		const { login, email, password } = data
		if (!Object.keys(errors).length) {
			if (!login) {
				sendToServer(email, password)
				return
			}
			sendToServer(login, email, password)
			return
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
					wrongAuth: hasAuthError,
				}}
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

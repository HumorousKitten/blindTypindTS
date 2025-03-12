import { FC } from 'react'
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import cl from './_form.module.scss'

interface IFormProps {
	sendToServer: (
		email: string,
		password: string,
		login?: string
	) => Promise<void>
}

interface IFormInputs {
	login: string
	email: string
	password: string
}

enum InputNamesEnum {
	login = 'login',
	email = 'email',
	password = 'password',
}

type TLengthInputValue = {
	value: number
	message: string
}

type TPatternInput = {
	value: RegExp
	message: string
}

interface IRules {
	required: boolean
	min?: number
	max?: number
	minLength?: TLengthInputValue
	maxLength?: TLengthInputValue
	pattern?: TPatternInput
	// validate: ??? какая-то функция для проверки валидации
}

interface IControlledInputProps {
	control: Control<IFormInputs>
	name: InputNamesEnum
	type: 'number' | 'text' | 'email' | 'password'
	placeholder: string
	regulations?: IRules
}

const ControlledInput: FC<IControlledInputProps> = ({
	name,
	control,
	type,
	placeholder,
	regulations,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Input field={field} type={type} placeholder={placeholder} />
			)}
			rules={regulations}
		/>
	)
}

export const Form: FC<IFormProps> = ({ sendToServer }) => {
	const location = useLocation().pathname.slice(1)

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
	})

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		console.log(data)
	}

	const onErrors = (errors: any) => {
		console.log(errors)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit, onErrors)}>
			<div>
				{location !== 'auth' ? (
					<ControlledInput
						name={InputNamesEnum.login}
						control={control}
						type='text'
						placeholder='Login'
						regulations={{
							required: true,
							minLength: {
								value: 6,
								message: 'Логин должен быть не менее 6 символов',
							},
							maxLength: {
								value: 20,
								message: 'Логин должен быть не более 20 символов',
							},
						}}
					/>
				) : null}
				<ControlledInput
					name={InputNamesEnum.email}
					control={control}
					type='email'
					placeholder='E-mail'
					regulations={{
						required: true,
						pattern: { 
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Некорректный e-mail'
            }
					}}
				/>
				<ControlledInput
					name={InputNamesEnum.password}
					control={control}
					type='password'
					placeholder='Password'
					regulations={{
						required: true,
						minLength: {
							value: 3,
							message: 'Пароль должен быть не менее 3 символов',
						},
						maxLength: {
							value: 18,
							message: 'Пароль должен быть не более 18 символов',
						},
					}}
				/>
			</div>
			<Button>{location === 'auth' ? 'Войти' : 'Регистрация'}</Button>
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

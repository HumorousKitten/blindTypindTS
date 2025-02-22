import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { IUIInfo } from '../../types/types'
import { DataINFO } from './DataInfo/Datainfo'
import cl from './_DataBlock.module.scss'
import { DataButton } from './dataButton/dataButton'
import { server } from '../../server/server'
import React from 'react'


interface IDatablockProps {
	UIInfo: IUIInfo
}

interface IFormFields {
	login?: string
	email: string
	password: string
}

type TtypeInput = 'text' | 'email' | 'password'
type Tplaceholder = 'Login' | 'E-mail' | 'Password'

interface IinputControlledProps {
	name: 'email' | 'login' | 'password'
	control: Control<IFormFields>
	type: TtypeInput
	placeholder: Tplaceholder
}

export interface IResponce {
  login: string
  email: string
  token: string
}

const InputControlled = (props: IinputControlledProps) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field }) => (
				<DataINFO
					{...field}
					placeholder={props.placeholder}
					type={props.type}
				/>
			)}
		/>
	)
}

export const Datablock = ({ UIInfo }: IDatablockProps) => {
	const { handleSubmit, control } = useForm<IFormFields>({
		defaultValues: {
			login: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
  })
  
  const [responceResult, setResponceResult] = React.useState<IResponce | boolean | null>(null)

  const onSubmit: SubmitHandler<IFormFields> = async data => {
    const { login, email, password } = data
    if (login) {
      const result = await server.registration(login, password, email)
      setResponceResult(result)
      return
    }
    const result = await server.login(email, password)
    setResponceResult(result)
	}

	return (
		<>
			<div className={cl.dataBlock}>
				<h2>{UIInfo.title}</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
          {(UIInfo.title === 'Регистрация') && (<InputControlled
            name='login'
            control={control}
            placeholder='Login'
            type='text'
          />)}
          <InputControlled
						name='email'
						control={control}
						placeholder='E-mail'
						type='email'
          />
          <InputControlled
						name='password'
						control={control}
						placeholder='Password'
						type='password'
					/>
          <DataButton textField={UIInfo.textfield} responceResult={responceResult} />
				</form>
				<div>
					<span>{UIInfo.isAccount}</span>
					<Link
						to={(UIInfo.signUp) ? '/registration' : '/authorization'}
						style={{
							color: '#0066FF',
							textDecorationLine: 'underline',
							fontSize: '0.75rem',
						}}
					>
						{UIInfo.logInHere || UIInfo.signUp}
					</Link>
				</div>
			</div>
		</>
	)
}

import React from 'react'
import { IResponce } from '../DataBlock'
import { useNavigate } from 'react-router-dom'
interface IDataButtonProps {
	textField: string
	responceResult: boolean | IResponce | null
}

export const DataButton = ({ textField, responceResult }: IDataButtonProps) => {
	const button = React.useRef<HTMLButtonElement>(null)
	const [textStatus, setTextStatus] = React.useState<string>(textField)
	const navigate = useNavigate()

	React.useEffect(() => {
		if (
			textField === 'Создать аккаунт' &&
			responceResult !== null &&
			!responceResult &&
			button.current
		) {
			button.current.style.background = 'red'
			setTextStatus('Пользователь уже существует')
    } else if (textField === 'Создать аккаунт' && responceResult) {
      navigate('/authorization')
    }

    if (textField === 'Войти' && responceResult) 
      navigate('/')
    else if(button.current && responceResult !== null){
      button.current.style.background = 'red'
      setTextStatus('Неверный логин или пароль')
    }
	}, [responceResult])

	return (
		<button
			style={{
				background: '#0066FF',
				borderRadius: '11px',
				color: 'white',
				height: '42px',
				fontWeight: '700',
				marginBottom: '9px',
			}}
			ref={button}
			// onClick={data}
		>
			{textStatus}
		</button>
	)
}

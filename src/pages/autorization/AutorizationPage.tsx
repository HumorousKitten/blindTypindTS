import { Datablock } from '../../components/DataBlock/DataBlock'
import { IUIInfo } from '../../types/types'

export const AuthorizationPage = () => {
	const UIInfo: IUIInfo = {
		title: 'Добро пожаловать!',
		textfield: 'Войти',
		isAccount: 'Еще нет аккаунта?',
		signUp: 'Зарегистрируйтесь',
	}

	return (
		<>
			<Datablock UIInfo={UIInfo} />
		</>
	)
}

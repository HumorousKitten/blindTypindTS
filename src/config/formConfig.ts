import { InputNamesEnum, IRules } from '../types/types'
import {
	emailPattern,
	maxLength,
	minLength,
} from '../utils/formValidate/validate'


interface inputConfigsInterface {
	name: InputNamesEnum
	type: 'number' | 'text' | 'email' | 'password' | 'checkbox'
	placeholder: string
	show: boolean
	rules: IRules
}

export const inputConfigs = (isAuthPage: boolean): Array<inputConfigsInterface> => [
	{
		name: InputNamesEnum.login,
		type: 'text',
		placeholder: 'Login',
		show: !isAuthPage,
		rules: {
			required: true,
			minLength: minLength(6, 'Логин должен быть не менее 6 символов'),
			maxLength: maxLength(20, 'Логин должен быть не более 20 символов'),
		},
	},

	{
		name: InputNamesEnum.email,
		type: 'email',
		placeholder: 'E-mail',
		show: true,
		rules: { required: true, pattern: emailPattern },
	},

	{
		name: InputNamesEnum.password,
		type: 'password',
		placeholder: 'Password',
		show: true,
		rules: {
			required: true,
			minLength: minLength(3, 'Пароль должен быть не менее 3-х символов'),
			maxLength: maxLength(18, 'Пароль должен быть не более 18 символов'),
		},
	},

	{
		name: InputNamesEnum.isTutor,
		type: 'checkbox',
		placeholder: 'Я учитель',
		show: !isAuthPage,
		rules: {
			required: true,
		},
	},
]

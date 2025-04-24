import { Input } from '../../UI/input/Input'
import { IFormInputs, InputNamesEnum, IRules} from '../../types/types'
import { Control, Controller } from 'react-hook-form'
import { FC } from 'react'

interface IControlledInputProps {
	control: Control<IFormInputs>
	name: InputNamesEnum
	type: 'number' | 'text' | 'email' | 'password' | 'checkbox'
	placeholder: string
	regulations?: IRules
	error: boolean
	errorMessage?: string 
}

export const ControlledInput: FC<IControlledInputProps> = ({
	name,
	control,
	type,
	placeholder,
	regulations,
	error,
	errorMessage
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<label>
					<Input field={field} type={type} placeholder={placeholder} error={error} />
					{type === 'checkbox' ? <span>Стать учителелем</span> : null}
					{error ? <span>{errorMessage}</span> : null}
				</label>
			)}
			rules={regulations}
		/>
	)
}

import React from 'react'
import Button from '../../UI/button/Button'
import { Input } from '../../UI/input/Input'
import { validateLengthRange } from '../../utils/formValidate/validate'

import cl from './_createCourse.module.scss'
import { useMutation } from '@tanstack/react-query'
import { server } from '../../server/server'

type TErrorMessage = 'название должно содержать 1-64 символа' 

export const CreateCourse = () => {
	const [nameCourse, setNameCourse] = React.useState<string>('')
	const [error, setError] = React.useState<TErrorMessage | ''>('')

	const mutation = useMutation({
		mutationFn: async ({ title }: {title: string}) => server.createCourse(title),
		onSuccess: data => {
			console.log(data)
		},
		onError: error => {
			console.log(error)
		}
	})

	function handleCourseNameInput(e: React.ChangeEvent<HTMLInputElement>) {
		if (validateLengthRange(1, 64, e.currentTarget.value)){
			if(error) setError('')
			setNameCourse(e.currentTarget.value)
		}
		else {
			setError('название должно содержать 1-64 символа')
		}
	}

	function handleQueryClick() {
		if(error) return
		mutation.mutate({title: nameCourse})
	}


	return (
		<div className={cl.newCourse}>
			<div className={cl.newCourse__title}>
				<h1>Создание нового курса</h1>
				<Button
					additionalClasses={{ closeBtn: true, background: 'transparent' }}
					className={cl.newCourse__closeBtn}
				></Button>
			</div>

			<label className={cl.newCourse__nameField__label}>
				<Input
					placeholder={'Название курса (Максимум 64 символа)'}
					type={'text'}
					className={cl.newCourse__nameField}
					onChange={handleCourseNameInput}
				/>
			</label>
			{error ? <p className={cl.newCourse__errorMessage}>{error}</p> : null}

			<p className={cl.newCourse__hint}>
				Начните работу над черновиком курса, перед публикацией можно будет{' '}
				<span className={cl.newCourse__hint__underline}>
					сделать курс платным
				</span>{' '}
				или оставить бесплатным.
			</p>

			<Button
				additionalClasses={{ background: 'blue' }}
				className={cl.newCourse__addBtn}
				onClick={handleQueryClick}
			>
				Создать курс
			</Button>
		</div>
	)
}

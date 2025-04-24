import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { server } from '../server/server'
import { IFormInputs } from '../types/types'


export const useAuthMutation = (isAuthPage: boolean) => {
	const navigate = useNavigate()
	const [isSuccess, setSuccess] = React.useState<boolean | null>(null)

	const mutation = useMutation({
		mutationFn: async ({ login, email, password, isTutor}: IFormInputs) =>
			isAuthPage
				? server.login(email, password)
				: server.registration(login, password, email, isTutor ? 'teacher' : 'student'),
		onSuccess: data => {
			setSuccess(!!data)
			if (data) {
				setTimeout(() => navigate('/'), 500)
			}
		},
	})

	return {mutation, isSuccess}
}

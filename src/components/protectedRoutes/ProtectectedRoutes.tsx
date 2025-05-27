import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { server } from '../../server/server'
import { useStore } from '../../state/store'

const ProtectedRoutes = () => {
	const updateUserRole = useStore(state => state.updateUserRole)
	const { data } = useQuery({
		queryKey: ['role'],
		queryFn: () => server.getUserRole(),
		staleTime: Infinity,
		retry: false,
	})

	React.useEffect(() => {
		if(!data) return
		updateUserRole(data.role)
	}, [data?.role])

	if (!data) return <Navigate to='/auth' replace />
	return <Outlet />
}

export default ProtectedRoutes

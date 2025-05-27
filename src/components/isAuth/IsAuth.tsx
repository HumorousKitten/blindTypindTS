import { Navigate, Outlet } from 'react-router-dom';
import { server } from '../../server/server';
import { useQuery} from '@tanstack/react-query'
import { useStore } from '../../state/store'

const IsAuth = () => {
	const isAuth = useStore(state => state.isAuth)

	const {data} = useQuery({
		queryKey: ['role'],
		queryFn: () => server.getUserRole(),
		staleTime: Infinity,
		retry: false,
		enabled: isAuth
	}) 

	if(!data) return <Outlet />
	return <Navigate to='/courses' replace/>
}
 
export default IsAuth;
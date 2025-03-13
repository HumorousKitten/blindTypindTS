import { Navigate, Outlet } from 'react-router-dom';

const IsAuth = () => {
	const token = ''

	if(token) {
		return <Navigate to='/' replace/>
	}

	return <Outlet />
}
 
export default IsAuth;
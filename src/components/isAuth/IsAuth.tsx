import { Navigate, Outlet } from 'react-router-dom';
import { server } from '../../server/server';

const IsAuth = () => {
	const token = server.readCookie('token')
	
	if(token) {
		return <Navigate to='/' replace/>
	}

	return <Outlet />
}
 
export default IsAuth;
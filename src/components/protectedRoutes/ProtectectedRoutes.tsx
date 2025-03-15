import { Navigate, Outlet } from 'react-router-dom';
import { server } from '../../server/server';

const ProtectedRoutes = () => {
	const token  = server.readCookie('token')
	
	if(!token){
		return <Navigate to='/auth' replace/>
	}

	return <Outlet/>
}
 
export default ProtectedRoutes;
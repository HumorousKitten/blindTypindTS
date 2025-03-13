import { createBrowserRouter } from 'react-router-dom'
import IsAuth from '../components/isAuth/IsAuth'
import ProtectedRoutes from '../components/protectedRoutes/ProtectectedRoutes'
import { AuthorizationPage } from '../pages/autorization/AutorizationPage'


export const router = createBrowserRouter([
	{
		element: <IsAuth />,
		children: [
			{
				path: '/auth',
				element: <AuthorizationPage />
			},

			{
				path: '/register',
				element: <h1>dfdf</h1>
			}
		]
	},

	{
		element: <ProtectedRoutes/>,
		children: [
			{
				path: '/',
				element: <h1>main</h1>
			}
		]
	}

	// {
	// 	path: '/',
	// 	element: <SimulatorPage />
	// },

	// {
	// 	path: '/levels',
	// 	element: <LevelsPage />
	// },

	// {
	// 	path: '/registration',
	// 	element: <Registration />
	// },

	// {
	// 	path: '/authorization',
	// 	element: <AuthorizationPage />
	// },
])
import { createBrowserRouter } from 'react-router-dom'
import IsAuth from '../components/isAuth/IsAuth'
import ProtectedRoutes from '../components/protectedRoutes/ProtectectedRoutes'
import { AuthorizationPage } from '../pages/autorization/AutorizationPage'
import { RegisterPage } from '../pages/Registration/RegistrationPage'
import { SimulatorPage } from '../pages/SimulatorPage/SimulatorPage'
import { LevelsPage } from '../pages/LevelsPage/LevelsPage'
import { Account } from '../pages/account/Account'

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
				element: <RegisterPage />
			}
		]
	},

	{
		element: <ProtectedRoutes/>,
		children: [
			{
				path: '/',
				// element: <SimulatorPage />
				element: <p>Main page</p>
			},
			// {
			// 	path: '/levels',
			// 	element: <LevelsPage />
			// },
			// {
			// 	path: '/account',
			// 	element: <Account />
			// },
		]
	}
])
import { createBrowserRouter } from 'react-router-dom'
import IsAuth from '../components/isAuth/IsAuth'
import ProtectedRoutes from '../components/protectedRoutes/ProtectectedRoutes'
import { AuthorizationPage } from '../pages/autorization/AutorizationPage'
import { RegisterPage } from '../pages/Registration/RegistrationPage'
import { SimulatorPage } from '../pages/SimulatorPage/SimulatorPage'
import { LevelsPage } from '../pages/LevelsPage/LevelsPage'

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
				element: <SimulatorPage />
			},
			{
				path: '/levels',
				element: <LevelsPage />
			}
		]
	}
])
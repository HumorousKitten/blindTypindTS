import { createBrowserRouter } from 'react-router-dom'
import IsAuth from '../components/isAuth/IsAuth'
import ProtectedRoutes from '../components/protectedRoutes/ProtectectedRoutes'
import { AuthorizationPage } from '../pages/autorization/AutorizationPage'
import { RegisterPage } from '../pages/Registration/RegistrationPage'
import { SimulatorPage } from '../pages/SimulatorPage/SimulatorPage'
import { LevelsPage } from '../pages/LevelsPage/LevelsPage'
import { Account } from '../pages/account/Account'
import { CoursePage } from '../pages/coursePage/CoursePage'


export const router = createBrowserRouter([
	{
		path:'/courses',
		element: <CoursePage />
	},

	{
		path:'/courses/:id',
		element: <div>course page</div>
	},

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
			// {
			// 	path: '/',
			// 	// element: <SimulatorPage />
			// 	element: <p>Main page</p>
			// },

			// {
			// 	path: '/', //в будущем поменять на /courses и вынести в отдельный объект, где element будет другой компонент, в котором будет проверяться роль на студента
			// 	element: <CoursePage />
			// }
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
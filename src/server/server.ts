import { ICourseDetail, ILevelInfo, ICourses, ICourseTasks, ISubLevel, IUserRole, IBoolQueryAnswer} from '../types/types'

interface IParams {
	path?: string
	[key: string]: string | number | undefined
}



interface IServer {
	send<T = unknown>(params: IParams): Promise<T>
	postSend<T = unknown>(params: IParams): Promise<T>
	getCourseDetail(course_id: number): Promise<ICourseDetail>
	getCourses(page: number): Promise<ICourses>
	checkSubscribeCourse(course_id: number): Promise<boolean>
	subscribeOnCourse(course_id: number): Promise<boolean>
	getCourseTasks(course_id: number): Promise<ICourseTasks>
	getLevelInfo(level_id: number): Promise< ILevelInfo>
	getSubLevel(level_id: number, order:number): Promise<ISubLevel>
	getUserRole(): Promise<IUserRole>
	createCourse(title: string): Promise<IBoolQueryAnswer>
	login(email: string, password: string): Promise<string>
	registration(
		login: string,
		password: string,
		email: string,
		role: string
	): Promise<string>
}

class Server implements IServer {
	async send<T = unknown>(params: IParams = {}): Promise<T> {
		const {path, ...queryParams } = params

		const headers: HeadersInit = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}

		const query = Object.keys(queryParams)
			.map(key => `${key}=${params[key]}`)
			.join('&')

		try {
			const result = await fetch(`http://localhost:5000/${path}?${query}`, {
				mode: 'cors',
				method: 'GET',
				credentials: 'include',
				headers,
			})
			const answer = await result?.json()

			if (!result.ok) {
				const errorData = await result.json()
				throw new Error(errorData.message || 'Ошибка сервера')
			}
			return answer
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Ошибка запроса: ${error.message}`)
			}
			throw new Error('Произошла неизвестная ошибка')
		}
	}

	async postSend<T = unknown>(params: IParams = {}): Promise<T> {
		const {path, ...queryParams } = params
		const headers: HeadersInit = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}

		try {
			const response = await fetch(`http://localhost:5000/${path}`, {
				mode: 'cors',
				method: 'POST',
				headers,
				credentials: 'include',
				body: JSON.stringify(queryParams),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Ошибка сервера')
			}

			const answer = await response.json()
			return answer
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Ошибка запроса: ${error.message}`)
			}
			throw new Error('Произошла неизвестная ошибка')
		}
	}

	async getCourseDetail(course_id: number): Promise<ICourseDetail> {
		return await this.send<ICourseDetail>({path: 'courses/course_details', course_id })
	}

	async getCourses(page: number): Promise<ICourses> {
		return await this.send<ICourses>({path: 'courses', page })
	}

	async checkSubscribeCourse(course_id: number): Promise<boolean> {
		return await this.send<boolean>({path: 'courses/subscribe', course_id})
	}

	async subscribeOnCourse(course_id: number): Promise<boolean> {
		return await this.postSend<boolean>({path: 'courses/subscribe', course_id})
	}

	async getCourseTasks(course_id: number): Promise<ICourseTasks> {
		return await this.send<ICourseTasks>({path: 'course/modules', course_id})
	}

	async getLevelInfo(level_id: number): Promise<ILevelInfo> {
		return await this.send<ILevelInfo>({path: 'course/level', level_id})
	}

	async getSubLevel(level_id: number, order:number): Promise<ISubLevel> {
		return await this.send<ISubLevel>({path: 'course-content/sublevel', level_id, order})
	}

	async getUserRole(): Promise<IUserRole> {
		return await this.send<IUserRole>({path: 'me/role'})
	}

	async createCourse(title: string): Promise<IBoolQueryAnswer> {
		return await this.postSend<IBoolQueryAnswer>({path: 'course/newCourse', title})
	}

	async login(email: string, password: string): Promise<string> {
		const data = await this.postSend<string>({ path: 'auth/login', email, password })

		return data
	}

	async registration(
		login: string,
		password: string,
		email: string,
		role: string
	): Promise<string> {
		const data = await this.postSend<string>({
			path: 'auth/register',
			login,
			password,
			email,
			role,
		})

		return data
	}


	// async getLevel(level_id: number, sublevel: number): Promise<string> {
	// 	return await this.send({ method: 'getLevel', level_id, sublevel })
	// }

	// async updateResultLevel(
	// 	level_id: number,
	// 	sublevel: number,
	// 	token: string,
	// 	cpm: number,
	// 	wpm: number,
	// 	accuracy: number
	// ) {
	// 	return await this.send({
	// 		method: 'updateResultLevel',
	// 		level_id,
	// 		sublevel,
	// 		token,
	// 		cpm,
	// 		wpm,
	// 		accuracy,
	// 	})
	// }

	// async getUserLogin(token: string): Promise<{ login: string }> {
	// 	return await this.send({ method: 'getUserLogin', token })
	// }

	// async getUserEmail(token: string): Promise<{ email: string }> {
	// 	return await this.send({ method: 'getUserEmail', token })
	// }

	// async getBestResult(token: string) {
	// 	return await this.send({ method: 'getBestResult', token })
	// }

	// async getUserLevels(
	// 	token: string
	// ): Promise<{ level: number; sublevel: number }[]> {
	// 	return await this.send({ method: 'getUserLevels', token })
	// }

}

export const server = new Server()

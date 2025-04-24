interface IParams {
	path?: string
	[key: string]: string | number | undefined
}

class Server {
	async send(params: IParams = {}) {
		// if (this.token) {
		//   params.token = this.token;
		// }
		const query = Object.keys(params)
			.map(key => `${key}=${params[key]}`)
			.join('&')
		const result = await fetch(`http://blindtypingserver/?${query}`)
		const answer = await result?.json()
		return answer.result === 'ok' ? answer.data : answer.result
	}

	async postSend(params: IParams = {}) {
    const { token, path, ...queryParams } = params
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    
		try {
			const response = await fetch(`http://localhost:5000/${path}`, {
				mode: 'cors',
				method: 'POST',
				headers,
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

	async login(email: string, password: string): Promise<string> {
		const data = await this.postSend({ path: 'auth/login', email, password })
		if (data) {
			document.cookie = `token=${data}; path=/; max-age=3600`
		}
		return data
	}

	async registration(
		login: string,
		password: string,
		email: string,
		role: string
	): Promise<string> {
		const data = await this.postSend({
			path: 'auth/register',
			login,
			password,
			email,
			role
		})

		if(data){
			document.cookie = `token=${data}; path=/; max-age=3600`
		}

		return data
	}

	async getLevel(level_id: number, sublevel: number): Promise<string> {
		return await this.send({ method: 'getLevel', level_id, sublevel })
	}

	async updateResultLevel(
		level_id: number,
		sublevel: number,
		token: string,
		cpm: number,
		wpm: number,
		accuracy: number
	) {
		return await this.send({
			method: 'updateResultLevel',
			level_id,
			sublevel,
			token,
			cpm,
			wpm,
			accuracy,
		})
	}

	async getUserLogin(token: string): Promise<{ login: string }> {
		return await this.send({ method: 'getUserLogin', token })
	}

	async getUserEmail(token: string): Promise<{ email: string }> {
		return await this.send({ method: 'getUserEmail', token })
	}

	async getBestResult(token: string) {
		return await this.send({ method: 'getBestResult', token })
	}

	async getUserLevels(
		token: string
	): Promise<{ level: number; sublevel: number }[]> {
		return await this.send({ method: 'getUserLevels', token })
	}

	readCookie(name: string) {
		const matches = document.cookie.match(
			new RegExp(
				'(?:^|; )' +
					name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
					'=([^;]*)'
			)
		)
		return matches ? decodeURIComponent(matches[1]) : undefined
	}

	deleteCookie(name: string) {
		if (this.readCookie(name)) {
			document.cookie = name + '=; Max-Age=-1;'
		}
	}
}

export const server = new Server()

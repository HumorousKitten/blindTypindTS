interface IParams {
  [key: string]: string | number | undefined
}

class Server {
	private token: string | null

  constructor() {
    this.token = null;
  }

	async send(params: IParams = {}) {
    // if (this.token) {
    //   params.token = this.token;
    // }
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const result = await fetch(`http://blindtypingserver/?${query}`);
    const answer = await result?.json();
    return answer.result === 'ok' ? answer.data : answer.result;
  }

  // async postSend(params = {}) {
  //   if (this.token) {
  //     params.token = this.token;
  //   }
  //   const responce = await fetch(`/api/?method=${params.method}`, {
  //     mode: 'no-cors',
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(params),
  //   });
  // }

  async login(email: string, password: string): Promise<string | boolean> {
    const data = await this.send({ method: 'login', email, password });
    if (data) {
      document.cookie = `token=${data}; path=/; max-age=3600`;
    }
    return data;
  }

  async registration(login: string, password: string, email: string):Promise<boolean> {
    return await this.send({ method: 'registration', login, password, email });
  }

  async getLevel(level_id: number, sublevel: number): Promise<string> {
    return await this.send({ method: 'getLevel', level_id, sublevel });
  }

  async updateResultLevel(level_id: number, sublevel: number, token: string, cpm: number, wpm: number, accuracy: number) {
    return await this.send({
      method: 'updateResultLevel',
      level_id,
      sublevel,
      token,
      cpm,
      wpm,
      accuracy,
    });
  }

  async getUserData(token: string) {
    return await this.send({ method: 'getUserData', token });
  }

  async getBestResult(token: string){
    return await this.send({ method: 'getBestResult', token });
  }

  async getUserLevels(token: string): Promise<{level: number, sublevel: number}[]>{
    return await this.send({ method: 'getUserLevels', token });
  }

  readCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}

export const server = new Server()

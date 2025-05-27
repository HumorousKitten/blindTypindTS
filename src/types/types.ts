
export enum IUserRoles {
	student = 'student',
	moderator = 'moderator',
	teacher = 'teacher',
	admin = 'admin'
}

export interface IUserRole {
	role: IUserRoles
}


export interface IFormInputs {
	login: string
	email: string
	password: string
	isTutor: boolean
}

export enum InputNamesEnum {
	login = 'login',
	email = 'email',
	password = 'password',
	isTutor = 'isTutor'
}

type TLengthInputValue = {
	value: number
	message: string
}

type TPatternInput = {
	value: RegExp
	message: string
}

export interface IRules {
	required: boolean
	min?: number
	max?: number
	minLength?: TLengthInputValue
	maxLength?: TLengthInputValue
	pattern?: TPatternInput
	// validate: ??? какая-то функция для проверки валидации
}

interface ICourseStats {
	ratingAvg: string
	enrollmentsCount: number
}

export interface ICourseDetail {
	title: string
	avgDuration: number
	price: string
	favorite: boolean
	details: {
		will_learn: string
		about_course: string
		for_whom: string
		preview_image: string
	}
	stats: ICourseStats
}

export interface ICourse {
	id: number
	title: string
	shortDesc: string
	previewImage: string
	avgDuration: number
	price: string
	slug: string
	favorite: boolean
	fromWhom: 'admin' | 'user'
	stats: ICourseStats
}

export interface ICourses {
	data: Array<ICourse>
	total: number
	pages: number
}


export interface ICourseSubLevels {
	id: number
	level_id: number
	order: number
}

export enum Lang{
  russian = "russian",
  english = "english"
}

export interface ICourseLevels {
	id: number
	level_block_id: number
	title: string
	type: 'lecture' | 'practice'
	order: number
	courseSubLevels: Array<ICourseSubLevels>
	level_language: {
		language: Lang
	}
}

export interface ICourseModule {
	id: number
	course_id: number
	title: string
	order: number
	courseLevels:Array<ICourseLevels>
}

export interface ICourseTasks {
	main_title: string
	modules: Array<ICourseModule>
}

export interface ILevelInfo {
	title: string
	type: 'lecture' | 'practice'
	levelInfo: {
		description?: string
		video_url?: string
	}
}

export interface ISubLevel {
	content: string
}
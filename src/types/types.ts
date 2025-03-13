

type correctness = boolean | null

export interface ICorrectnessCodeKey {
  correct: correctness
  codeKey: string
}


export interface IStylesOfKeyCaps {
	width: string
	height: string,
	borderRadius: string,
	background: string,
	position?: 'static' | 'absolute',
	bottom?: string,
  left?: string,
}

export enum KeyCodes {
	'`' = "Backquote", // `
 '-' = "Minus", // -
 '=' = "Equal", // =
 '[' = "BracketLeft", // [
 ']' = "BracketRight", // ]
 ';' = "Semicolon", // ;
 '\'' = "Quote", // '
 ',' = "Comma", // ,
 '.' = "Period", // .
 '/' = "Slash",
 'Backspace' = '<-',
 'Tab' = 'tab' ,
 'CapsLock' = 'caps',
 'Enter' = 'enter',
 'ShiftLeft' = 'shift',
 'ShiftRight' = 'shift',
 'Space' = '',
 'Backslash' = '\\'
}

type TRegistration = 'Регистрация' | 'Добро пожаловать!'
export interface IUIInfo {
	title: TRegistration
	textfield: string
	isAccount: string
	signUp?: string
	logInHere?: string
}

export interface IFormInputs {
	login: string
	email: string
	password: string
}

export enum InputNamesEnum {
	login = 'login',
	email = 'email',
	password = 'password',
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
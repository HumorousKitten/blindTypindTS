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


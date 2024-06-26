import React from 'react'
import { KeyCodes, ICorrectnessCodeKey} from '../../../types/types'
import { OptimizeKeyBlock } from './KeyBlock/KeyBlock'
import { styles } from './KeyStyles'
import cl from './_KeyBoard.module.scss'


const specialCharacters: readonly string[] = [
	'`',
	'-',
	'=',
	'[',
	']',
	';',
	"'",
	"'",
	',',
	'.',
	'/',
]

const specialKeyCaps: readonly string[] = [
	'Backspace',
	'Tab',
	'CapsLock',
	'Enter',
	'ShiftLeft',
	'ShiftRight',
	'Space',
	'Backslash',
]



interface IAttributesOfKeyBlocksProps {
	letters: readonly string[]
}


export const AttributesOfKeyBlocks = ({letters}: IAttributesOfKeyBlocksProps) => {
	
	function isLiteralType(
		keyCodesArray: readonly string[],
		value: string
	): boolean {
		return keyCodesArray.includes(value)
	}

	function getKeyCode(key: string): KeyCodes {
		const KEY_CODE = KeyCodes[key as keyof typeof KeyCodes]
		return KEY_CODE
	}

	return (
		<div className={cl.KeyBoardBlock}>
			{letters.map(item => {
				if (isLiteralType(specialCharacters, item)) {
					return (
						<OptimizeKeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id={getKeyCode(item)}
						/>
					)
				}

				if (isLiteralType(specialKeyCaps, item)) {
					return (
						<OptimizeKeyBlock
							key={item}
							styles={styles[item as keyof typeof styles]}
							elem={getKeyCode(item)}
							id={item}
						/>
					)
				}

				if (item === 'F' || item === 'J') {
					return (
						<OptimizeKeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id={'Key' + item}
							helpfulRecess={styles.HelpfulRecess}
						/>
					)
				}
				if (!isNaN(+item)) {
					return (
						<OptimizeKeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id={'digit' + item}
						/>
					)
				}

				return (
					<OptimizeKeyBlock
						key={item}
						styles={styles.identical}
						elem={item}
						id={'Key' + item}
					/>
				)
			})}
		</div>
	)
}

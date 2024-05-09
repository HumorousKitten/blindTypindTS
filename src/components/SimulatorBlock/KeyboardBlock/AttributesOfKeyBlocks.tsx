import React from 'react'
import { KeyCodes} from '../../../types/types'
import { MemoizedKeyBlock } from './KeyBlock/KeyBlock'
import { specialCharacters } from './KeyBlock/specialSymbols'
import { specialKeyCaps } from './KeyBlock/specialSymbols'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { styles } from './KeyStyles'
import cl from './_KeyBoard.module.scss'


interface IAttributesOfKeyBlocksProps {
	letters: readonly string[]
}

type Enum<T> = {
  [K in keyof T]: T[K];
};
type TCodeKey = NonNullable<HTMLElement | null>

export const AttributesOfKeyBlocks = ({letters}: IAttributesOfKeyBlocksProps) => {
	const {correct, codeKey, currentKey, nextKey} = useSelector((state: RootState) => state.correctCodeKey)
	
	React.useEffect(() => {
		if (!codeKey)
			nextKeyPressing()
		if (correct)
			correctKeyPressing()
		if (correct !== null && !correct)
			wrongKeyPressing()
	}, [correct, codeKey, nextKey])
	
	function isLiteralType<T extends Enum<T>>(
		charEnum: T,
		value: string
	): boolean {
		return Object.values(charEnum).includes(value)
	}

	function getKeyCode(key: string): KeyCodes {
		const KEY_CODE = KeyCodes[key as keyof typeof KeyCodes]
		return KEY_CODE
	}
	
	

	function wrongKeyPressing() {
		const wrongCodeKey = document.getElementById(codeKey) as TCodeKey
		const prevKey = translateKeyIntoKeyCode(currentKey)
		const currentNecessaryKey = document.getElementById(prevKey) as TCodeKey
		currentNecessaryKey.style.border = 'none'
    wrongCodeKey.classList.add(cl.wrongKeyCode)
    setTimeout(() => {
        if(cl.wrongKeyCode) wrongCodeKey.classList.remove(cl.wrongKeyCode)
		}, 600)
		nextKeyPressing()
	}

	function correctKeyPressing() {
		const currentCodeKey = document.getElementById(codeKey) as TCodeKey
		currentCodeKey.style.border = 'none'
		nextKeyPressing()
	}

	function nextKeyPressing() {
		const nextKeyPress = translateKeyIntoKeyCode(nextKey) 
		const keyCapElement = document.getElementById(nextKeyPress)
		if (keyCapElement) {
			keyCapElement.style.border = '2px solid gray'
		}
	}
	
	function translateKeyIntoKeyCode(key: string): string{
		if (key === ' ')
			return 'Space'

		if (!isNaN(+key))
			return 'digit' + key

		if (key in specialCharacters){
			return Object.keys(specialCharacters).find(keyCode => specialCharacters[keyCode as keyof typeof specialCharacters] === key) as string;
		}

		return 'Key' + key.toUpperCase()
	}

	return (
		<div className={cl.KeyBoardBlock}>
			{letters.map(item => {
				if (isLiteralType(specialCharacters, item)) {
					return (
						<MemoizedKeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id={getKeyCode(item)}
						/>
					)
				}

				if (isLiteralType(specialKeyCaps, item)) {
					return (
						<MemoizedKeyBlock
							key={item}
							styles={styles[item as keyof typeof styles]}
							elem={getKeyCode(item)}
							id={item}
						/>
					)
				}

				if (item === 'F' || item === 'J') {
					return (
						<MemoizedKeyBlock
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
						<MemoizedKeyBlock
							key={item}
							styles={styles.identical}
							elem={item}
							id={'digit' + item}
						/>
					)
				}

				return (
					<MemoizedKeyBlock
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

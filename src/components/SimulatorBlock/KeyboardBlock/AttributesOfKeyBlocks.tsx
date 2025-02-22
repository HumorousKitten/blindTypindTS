import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { KeyCodes } from '../../../types/types'
import { MemoizedKeyBlock } from './KeyBlock/KeyBlock'
import { specialCharacters, specialKeyCaps } from './KeyBlock/specialSymbols'
import { styles } from './KeyStyles'
import cl from './_KeyBoard.module.scss'

interface IAttributesOfKeyBlocksProps {
	letters: readonly string[]
}

type Enum<T> = {
	[K in keyof T]: T[K]
}
type TCodeKey = NonNullable<HTMLElement | null>

export const AttributesOfKeyBlocks = ({
	letters,
}: IAttributesOfKeyBlocksProps) => {
	const {
		correct,
		codeKey,
		currentKey,
		nextKey,
		letterPosition,
		forSimilarKeyTaps,
	} = useSelector((state: RootState) => state.correctCodeKey)

	React.useEffect(() => {
		if (!codeKey && nextKey) necessaryKeyPressing(nextKey)
		if (codeKey === 'Backspace') pressBackspace()
		if (correct && codeKey !== 'Backspace') correctKeyPressing()
		if (correct !== null && !correct) wrongKeyPressing()
	}, [correct, codeKey, nextKey, letterPosition, forSimilarKeyTaps])
	
	React.useEffect(() => {
		if (nextKey) {
			return () => {
				const element = document.getElementById(translateKeyIntoKeyCode(nextKey))
				if (element)
					element.style.border = 'none'
				}
		}
	}, [nextKey])

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

	function wrongKeyPressing(): void {
		const wrongCodeKey = document.getElementById(codeKey) as TCodeKey
		const prevKey = translateKeyIntoKeyCode(currentKey)
		const currentNecessaryKey = document.getElementById(prevKey) as TCodeKey
		currentNecessaryKey.style.border = 'none'
		keyCapPress()
		wrongCodeKey.classList.add(cl.wrongKeyCode)
		setTimeout(() => {
			if (cl.wrongKeyCode) wrongCodeKey.classList.remove(cl.wrongKeyCode)
		}, 500)
		necessaryKeyPressing(nextKey)
	}

	function correctKeyPressing(): void {
		const currentCodeKey = document.getElementById(codeKey) as TCodeKey
		currentCodeKey.style.border = 'none'
		keyCapPress()
		necessaryKeyPressing(nextKey)
	}

	function keyCapPress(): void {
		const currentCodeKey = document.getElementById(codeKey) as TCodeKey
		currentCodeKey.classList.add(cl.keyCapPress)
		setTimeout(() => {
			if (cl.keyCapPress) currentCodeKey.classList.remove(cl.keyCapPress)
		}, 300)
	}

	function necessaryKeyPressing(key: string): void {
		const nextKeyPress = translateKeyIntoKeyCode(key)
		const keyCapElement = document.getElementById(nextKeyPress)
		if (keyCapElement) {
			keyCapElement.style.border = '2px solid gray'
		}
	}

	function pressBackspace(): void {
		keyCapPress()
		if (letterPosition <= 0) return
		const nextCodeKey = document.getElementById(
			translateKeyIntoKeyCode(nextKey)
		) as TCodeKey
		nextCodeKey.style.border = 'none'
		necessaryKeyPressing(currentKey)
	}

	function hasKeyByValue(enumObject: typeof specialCharacters, valueToFind: string): boolean {
    return!!Object.keys(enumObject).find(key => enumObject[key as keyof typeof enumObject] === valueToFind);
}
	function translateKeyIntoKeyCode(key: string): string {
		if (key === ' ') return 'Space'

		if (!isNaN(+key)) return 'Digit' + key

		if (hasKeyByValue(specialCharacters, key)) {
			return (Object.keys(specialCharacters).find(
				keyCode =>
					specialCharacters[keyCode as keyof typeof specialCharacters] === key
			) as string)
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
							id={'Digit' + item}
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

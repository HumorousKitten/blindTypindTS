import React from 'react'
import { MemoizedKeyBlock } from './KeyBlock/KeyBlock'
import { styles } from './KeyStyles'
import cl from './_KeyBoard.module.scss'

interface IAttributesOfKeyBlocksProps {
	letters: readonly string[]
}


export const AttributesOfKeyBlocks = ({
	letters,
}: IAttributesOfKeyBlocksProps) => {


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

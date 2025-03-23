import React, { FC } from 'react'
import cl from './_keyBlock.module.scss'

interface IKeyBlockProps {
	children: string
	requiredLetter: string
	wrongLetter: string
	rightLetter: string
}

export const KeyBlock: FC<IKeyBlockProps> = ({ children, requiredLetter, wrongLetter, rightLetter }) => {
	const [isWrong, setIsWrong] = React.useState<boolean>(false)
	// console.log(wrongLetter)
	const keyNames: Record<string, string> = {
		Backspace: '<-',
		Tab: 'tab',
		CapsLock: 'caps',
		Enter: 'enter',
		ShiftLeft: 'shift',
		ShiftRight: 'shift',
		Space: '',
		Backslash: '\\',
	}
	
	const keyName = keyNames[children] || children

	React.useEffect(() => {
		// console.log("Effect triggered:", { wrongLetter, keyName });
		if(wrongLetter.toUpperCase() === keyName){
			setIsWrong(true)

			const timer = setTimeout(() => {
				setIsWrong(false)
			}, 900)

			return () => clearTimeout(timer)
		}
	}, [wrongLetter, keyName])

	return (
		<div
			className={`
				${cl.keyBlock} 
				${cl[children] || cl.standartKey}
				${requiredLetter.toUpperCase() === keyName ? cl.requiredLetter : ''}
				${isWrong ? cl.wrongLetter : ''}
				`
		
		}

		>
			{keyName}
			{/* <div style={helpfulRecess}></div> */}
		</div>
	)
}

// export const MemoizedKeyBlock = React.memo(KeyBlock)

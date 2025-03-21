import React, { FC } from 'react'
import cl from './_keyBlock.module.scss'

interface IKeyBlockProps {
	children: string
}

const KeyBlock: FC<IKeyBlockProps> = ({ children }) => {

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

	return (
		<div
			className={`${cl.keyBlock} ${
				cl[children] || cl.standartKey
			}`}
		>
			{keyName}
			{/* <div style={helpfulRecess}></div> */}
		</div>
	)
}

export const MemoizedKeyBlock = React.memo(KeyBlock)

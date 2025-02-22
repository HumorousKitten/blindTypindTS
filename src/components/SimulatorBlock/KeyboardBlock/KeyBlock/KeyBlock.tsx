import React, { FC } from 'react'
import { IStylesOfKeyCaps } from '../../../../types/types'

interface IKeyBlock {
	styles: IStylesOfKeyCaps
	elem: string
	helpfulRecess?: IStylesOfKeyCaps
	id: string
}

const KeyBlock: FC<IKeyBlock> = ({ styles, elem, helpfulRecess, id }) => {
	return (
		<div style={styles} id={id}>
			{elem}
			<div style={helpfulRecess}></div>
		</div>
	)
}

export const MemoizedKeyBlock = React.memo(KeyBlock)

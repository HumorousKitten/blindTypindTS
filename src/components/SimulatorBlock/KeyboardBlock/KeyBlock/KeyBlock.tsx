import { FC } from 'react'
import { IStylesOfKeyCaps, ICorrectnessCodeKey } from '../../../../types/types'
import React from 'react'
import style from './keyBlock.module.scss'


interface IKeyBlock {
	styles: IStylesOfKeyCaps
	elem: string
	helpfulRecess?: IStylesOfKeyCaps
  id: string
  correctnessCodeKey: ICorrectnessCodeKey
}

const KeyBlock: FC<IKeyBlock> = ({
	styles,
	elem,
	helpfulRecess,
  id,
  correctnessCodeKey,
}) => {

  const {correct, codeKey} = correctnessCodeKey


  React.useEffect(() => {
    // (!correct && correct !== null) && wrongKeyPressing()
    console.log(codeKey)
  }, [correct, codeKey])

  function wrongKeyPressing() {
    type TCodeKey = NonNullable<HTMLElement | null>
    if (codeKey !== '') {
      const wrongCodeKey = document.getElementById(codeKey) as TCodeKey
      console.log(wrongCodeKey, style.wrongCodeKey)
      wrongCodeKey.classList.add(style.wrongKeyCode)

      // setTimeout(() => {
      //   if(style.wrongKeyCode) wrongCodeKey.classList.remove(style.wrongKeyCode)
      // }, 700)
    }
  }

	return (
		<div style={styles} id={id}>
			{elem}
			<div style={helpfulRecess}></div>
		</div>
	)
}

// const arePropsEqual = (nextProps: IKeyBlock): boolean => {
//   const isRight = nextProps.correctnessCodeKey.codeKey === "key" + nextProps.elem.toUpperCase()
//   return isRight ? false : true
// }

export const OptimizeKeyBlock = React.memo(KeyBlock) 
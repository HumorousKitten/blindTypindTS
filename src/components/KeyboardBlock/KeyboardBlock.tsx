import { FC } from "react"
// import { AttributesOfKeyBlocks } from "./AttributesOfKeyBlocks";
// import { ICorrectnessCodeKey } from '../../../types/types';
import { useStore } from '../../state/store'
import { KeyBlock } from './KeyBlock/KeyBlock'
import cl from './_KeyBoard.module.scss'
import { useLocation } from 'react-router-dom'

import { Lang } from '../../types/types'

interface IKeyboardBlockProps {
  mistakes: string[]
  lang: Lang
}

export const KeyBoardBlock: FC<IKeyboardBlockProps> = ({mistakes, lang}) => {
  const englishLetters: readonly string[] = [
    "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
    "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","Backslash",
    "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter",
    "ShiftLeft","Z","X","C","V","B","N","M",",",".","/","ShiftRight",
    "Space"
	];

  const russianLetters: readonly string[] = [
    "Ё","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
    "Tab","Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ","Backslash",
    "CapsLock","Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э","Enter",
    "ShiftLeft","Я","Ч","С","М","И","Т","Ь","Б","Ю","/","ShiftRight",
    "Space"
	];

  const keyBoard = {
    [Lang.russian]: russianLetters,
    [Lang.english]: englishLetters
  }[lang]

	
  const {requiredLetter, wrongLetter, rightLetter} = useStore(state => state.simulatorInputInfo)
 
  const uniqueMistakes = [...new Set(mistakes)]

  return (
    <div className={cl.KeyBoardBlock}>
      {keyBoard?.map((item, index) => {
        return <KeyBlock key={index} requiredLetter = {requiredLetter} wrongLetter = {wrongLetter} rightLetter = {rightLetter} mistakes = {uniqueMistakes}>{item}</KeyBlock> 
      })}
    </div>
  );
}
 
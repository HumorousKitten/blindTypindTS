import React, { FC } from "react";
// import { AttributesOfKeyBlocks } from "./AttributesOfKeyBlocks";
// import { ICorrectnessCodeKey } from '../../../types/types';
import { useStore } from '../../state/store';
import {KeyBlock} from './KeyBlock/KeyBlock';
import cl from './_KeyBoard.module.scss'


interface IKeyboardBlockProps {
  mistakes: string[]
}

export const KeyBoardBlock: FC<IKeyboardBlockProps> = ({mistakes}) => {
    const lettersArr: readonly string[] = [
        "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
        "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","Backslash",
        "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter",
        "ShiftLeft","Z","X","C","V","B","N","M",",",".","/","ShiftRight",
        "Space"
		];
	
    const {requiredLetter, wrongLetter, rightLetter} = useStore(state => state.simulatorInputInfo)
  
    const uniqueMistakes = [...new Set(mistakes)]
    console.log(uniqueMistakes)

    return (
      <div className={cl.KeyBoardBlock}>
        {lettersArr.map((item, index) => {
          return <KeyBlock key={index} requiredLetter = {requiredLetter} wrongLetter = {wrongLetter} rightLetter = {rightLetter} mistakes = {uniqueMistakes}>{item}</KeyBlock> 
        })}
      </div>
    );
}
 
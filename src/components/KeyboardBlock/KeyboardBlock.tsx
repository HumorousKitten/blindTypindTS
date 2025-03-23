import React from "react";
// import { AttributesOfKeyBlocks } from "./AttributesOfKeyBlocks";
// import { ICorrectnessCodeKey } from '../../../types/types';
import { useStore } from '../../state/store';
import {KeyBlock} from './KeyBlock/KeyBlock';
import cl from './_KeyBoard.module.scss'



export const KeyBoardBlock = () => {
    const lettersArr: readonly string[] = [
        "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
        "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","Backslash",
        "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter",
        "ShiftLeft","Z","X","C","V","B","N","M",",",".","/","ShiftRight",
        "Space"
		];
	
    const {requiredLetter, wrongLetter, rightLetter} = useStore(state => state.simulatorInputInfo)
    // console.log(requiredLetter, wrongLetter, rightLetter)
  
    return (
      <div className={cl.KeyBoardBlock}>
        {lettersArr.map((item, index) => {
          return <KeyBlock key={index} requiredLetter = {requiredLetter} wrongLetter = {wrongLetter} rightLetter = {rightLetter}>{item}</KeyBlock> 
        })}
      </div>
    );
}
 
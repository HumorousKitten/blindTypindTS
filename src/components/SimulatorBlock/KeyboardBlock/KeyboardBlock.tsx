import React from "react";
import { AttributesOfKeyBlocks } from "./AttributesOfKeyBlocks";
import { ICorrectnessCodeKey } from '../../../types/types';

// interface IKeyBoardBlockProps {
//   correctnessCodeKey: ICorrectnessCodeKey
// }

export const KeyBoardBlock = () => {
    const lettersArr: readonly string[] = [
        "`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace",
        "Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","Backslash",
        "CapsLock","A","S","D","F","G","H","J","K","L",";","'","Enter",
        "ShiftLeft","Z","X","C","V","B","N","M",",",".","/","ShiftRight",
        "Space"
		];
	

  
    return (
      <AttributesOfKeyBlocks letters={lettersArr} />
    );
}
 
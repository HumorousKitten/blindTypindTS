import React from "react";
import { SimulatorStr } from "./SimulatorStrBlock/SimulatorStr";
import { KeyBoardBlock } from './KeyboardBlock/KeyboardBlock';
//import { ICorrectnessCodeKey } from '../../types/types';

import cl from "./_SimulatorBlock.module.scss";


export const SimulatorBlock = () => {
  // const [correctnessCodeKey, setTheCorrectnessCodeKey] = React.useState<ICorrectnessCodeKey>({
  //   correct: null,
  //   codeKey: ''
  // })

  


  return (
    <div className={cl.MainContainer}>
      <SimulatorStr />
      <KeyBoardBlock />
    </div>
  );
};
 

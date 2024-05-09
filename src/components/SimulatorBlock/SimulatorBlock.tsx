import React from "react";
import { SimulatorStr } from "./SimulatorStrBlock/SimulatorStr";
import { KeyBoardBlock } from './KeyboardBlock/KeyboardBlock';
import cl from "./_SimulatorBlock.module.scss";


export const SimulatorBlock = () => {
  return (
    <div className={cl.MainContainer}>
      <SimulatorStr />
      <KeyBoardBlock />
    </div>
  );
};
 

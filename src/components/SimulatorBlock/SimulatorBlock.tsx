import React from "react";
import { KeyBoardBlock } from '../KeyboardBlock/KeyboardBlock';
import { SimulatorStr } from '../SimulatorStr/SimulatorStr';
import { ProgressBar } from '../progressBar/ProgressBar';
import cl from "./_SimulatorBlock.module.scss";


export const SimulatorBlock = () => {
  return (
    <div className={cl.MainContainer}>
      <SimulatorStr />
      <ProgressBar />
      <KeyBoardBlock />
    </div>
  );
};
 

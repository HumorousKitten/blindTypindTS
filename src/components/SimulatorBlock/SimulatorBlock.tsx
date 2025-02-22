import React from "react";
import { SimulatorStr } from "./SimulatorStrBlock/SimulatorStr";
import { KeyBoardBlock } from './KeyboardBlock/KeyboardBlock';
import { LevelBlock } from './LevelsBlock/LevelBlock';
import cl from "./_SimulatorBlock.module.scss";


export const SimulatorBlock = () => {
  return (
    <div className={cl.MainContainer}>
      <LevelBlock />
      <SimulatorStr />
      <KeyBoardBlock />
    </div>
  );
};
 

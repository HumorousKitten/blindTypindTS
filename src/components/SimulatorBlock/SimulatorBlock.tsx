import React from "react";
import { KeyBoardBlock } from '../KeyboardBlock/KeyboardBlock';
import cl from "./_SimulatorBlock.module.scss";


export const SimulatorBlock = () => {
  return (
    <div className={cl.MainContainer}>
      <KeyBoardBlock />
    </div>
  );
};
 

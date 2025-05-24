import React from 'react';
import { LevelsBlock } from "../../components/levelsBlock/LevelsBlock";
import { Header } from '../../components/Header/Header';
import { InfoLevelModal } from '../../components/infoLevelModal/InfoLevelModal';

import cl from './_levelsPage.module.scss'

export const LevelsPage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false) 

  const [levelId, setLevelId] = React.useState<number>(0) 

  return (
    <>
      <Header />
      <main className={cl.main}>
        {!isOpenModal ? <LevelsBlock openModal = {setIsOpenModal} setLevelId = {setLevelId}/> : null}
        {isOpenModal ? <InfoLevelModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} levelId = {levelId}/> : null}
      </main>
    </>
  );
};

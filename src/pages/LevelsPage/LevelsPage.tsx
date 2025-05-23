import React from 'react';
import { LevelsBlock } from "../../components/levelsBlock/LevelsBlock";
import { Header } from '../../components/Header/Header';
import { InfoLevelModal } from '../../components/infoLevelModal/InfoLevelModal';

import cl from './_levelsPage.module.scss'

export const LevelsPage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false) 

  return (
    <>
      <Header />
      <main className={cl.main}>
        {!isOpenModal ? <LevelsBlock openModal = {setIsOpenModal}/> : null}
        <InfoLevelModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
      </main>
    </>
  );
};

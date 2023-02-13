import React from 'react';
import { Panel } from 'rsuite';
import { useImagesImport } from '../../../hooks/useImagesImport';
import user from '../../../services/user';
import RewardsGrid from './RewardsGrid';

const GameInterfaceRewards: React.FC = () => {
  const images = useImagesImport();

  return (
    <Panel className="gameinterface__rewards">
      <h1>Bienvenue dans la salle des trophées !</h1>
      <p>Clique sur tes trophées pour les voir en grand</p>
      <RewardsGrid user={user} images={images} />
    </Panel>
  );
};

export default GameInterfaceRewards;

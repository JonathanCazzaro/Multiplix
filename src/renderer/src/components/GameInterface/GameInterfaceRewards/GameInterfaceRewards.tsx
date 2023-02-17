import React from 'react';
import { Panel } from 'rsuite';
import user from '../../../services/user';
import RewardsGrid from './RewardsGrid';
import images from '../../../assets/images/rewards/index';

const GameInterfaceRewards: React.FC = () => {
  return (
    <Panel className="gameinterface__rewards">
      <h1>Bienvenue dans la salle des trophées !</h1>
      <p>Clique sur tes trophées pour les voir en grand</p>
      <RewardsGrid user={user} images={images} />
    </Panel>
  );
};

export default GameInterfaceRewards;

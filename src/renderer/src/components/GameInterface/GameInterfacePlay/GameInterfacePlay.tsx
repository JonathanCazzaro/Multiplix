import React, { useState } from 'react';
import audioPlayer from '../../../services/audioPlayer';
import { Serie } from '../../../services/classes/serieModel';
import user from '../../../services/user';
import Transition from '../../Transition/Transition';
import FinishBoard from './Boards/FinishBoard';
import InGameBoard from './Boards/InGameBoard';
import StartBoard from './Boards/StartBoard';

interface GameInterfacePlayProps {
  redirect: (page: Multiplix.Page) => void;
}

const GameInterfacePlay: React.FC<GameInterfacePlayProps> = ({ redirect }) => {
  const [serie] = useState(new Serie({ length: 10, helpTokensAmount: 3, tables: user.chosenTables, timeout: 10 }));
  const [hasReward, setHasReward] = useState(false);
  const [playState, setPlayState] = useState<Multiplix.PlayState>('start');

  const handleRestart = () => {
    serie.reset();
    setPlayState('ongoing');
  };

  const handleQuit = () => {
    redirect('home');
  };

  const handleFinish = (hasReward: boolean) => {
    setPlayState('finished');
    setHasReward(hasReward);
    if (hasReward) audioPlayer.playEvent('endserie');
  };

  const handleStart = () => {
    setPlayState('ongoing');
    audioPlayer.setRandomBackgroundSource();
  };

  return (
    <Transition<Multiplix.PlayState>
      state={playState}
      components={[
        {
          stateValue: 'start',
          animations: ['zoom'],
          duration: 150,
          content: <StartBoard onStart={handleStart} serie={serie} />
        },
        {
          stateValue: 'ongoing',
          animations: ['zoom'],
          duration: 150,
          content: <InGameBoard onFinish={handleFinish} serie={serie} user={user} />
        },
        {
          stateValue: 'finished',
          animations: ['opacity'],
          duration: 150,
          content: <FinishBoard onRestart={handleRestart} onQuit={handleQuit} serie={serie} hasReward={hasReward} />
        }
      ]}
    />
  );
};

export default GameInterfacePlay;

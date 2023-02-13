import React, { useState } from 'react';
import { Container } from 'rsuite';
import Transition from '../Transition/Transition';
import GameInterfaceHeader from './GameInterfaceHeader/GameInterfaceHeader';
import GameInterfaceHome from './GameInterfaceHome/GameInterfaceHome';
import GameInterfacePlay from './GameInterfacePlay/GameInterfacePlay';
import GameInterfaceRevising from './GameInterfaceRevising/GameInterfaceRevising';
import GameInterfaceRewards from './GameInterfaceRewards/GameInterfaceRewards';
import GameInterfaceSettings from './GameInterfaceSettings/GameInterfaceSettings';

const GameInterface: React.FC<{ logOut: () => void }> = ({ logOut }) => {
  const [page, setPage] = useState<Multiplix.Page>('home');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleRedirect = (redirection: Multiplix.Page) => {
    setPage(redirection);
  };

  return (
    <Container className="gameinterface">
      <GameInterfaceHeader
        handleDisconnect={logOut}
        currentPage={page}
        setPage={setPage}
        setSettingsOpen={() => setSettingsOpen(true)}
      />
      <GameInterfaceSettings isOpen={settingsOpen} close={() => setSettingsOpen(false)} isPlaying={page === 'game'} />
      <Transition<Multiplix.Page>
        ContainerProps={{ className: 'game-transitionner' }}
        state={page}
        components={[
          {
            stateValue: 'home',
            animations: ['opacity'],
            duration: 200,
            content: <GameInterfaceHome setPage={setPage} />
          },
          {
            stateValue: 'game',
            animations: ['opacity'],
            duration: 200,
            content: <GameInterfacePlay redirect={handleRedirect} />
          },
          { stateValue: 'revising', animations: ['opacity'], duration: 200, content: <GameInterfaceRevising /> },
          { stateValue: 'rewards', animations: ['opacity'], duration: 200, content: <GameInterfaceRewards /> }
        ]}
      />
    </Container>
  );
};

export default GameInterface;

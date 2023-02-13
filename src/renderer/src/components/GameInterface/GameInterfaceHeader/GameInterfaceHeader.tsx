import React from 'react';
import { Nav, Navbar } from 'rsuite';
import { IoGameController as GameIcon, IoPersonCircle as UserIcon, IoHome as HomeIcon } from 'react-icons/io5';
import { FaBrain as ReviseIcon } from 'react-icons/fa';
import logoSrc from '../../../assets/images/multiplix.png';
import user from '../../../services/user';
import ScoreIndicator from './ScoreIndicator';
import game from '../../../services/game';
import RewardsNavItem from './RewardsNavItem';

interface GameInterfaceHeaderProps {
  handleDisconnect: () => void;
  setPage: (page: Multiplix.Page) => void;
  setSettingsOpen: () => void;
  currentPage: Multiplix.Page;
}

const GameInterfaceHeader: React.FC<GameInterfaceHeaderProps> = ({
  handleDisconnect,
  setPage,
  currentPage,
  setSettingsOpen
}) => {
  return (
    <header>
      <Navbar className="gameinterface__navbar">
        <Navbar.Brand className="gameinterface__navbar__logobutton">
          <img src={logoSrc} alt="logo du personnage Multiplix" />
        </Navbar.Brand>
        <Nav activeKey={currentPage} onSelect={setPage} appearance="subtle">
          <Nav.Item eventKey="home" icon={<HomeIcon />}>
            Accueil
          </Nav.Item>
          <Nav.Item eventKey="game" icon={<GameIcon />}>
            Lancer une série
          </Nav.Item>
          <Nav.Item eventKey="revising" icon={<ReviseIcon />}>
            Réviser
          </Nav.Item>
          <RewardsNavItem user={user} />
        </Nav>
        <Nav pullRight className="gameinterface__navbar__right">
          <ScoreIndicator user={user} game={game} />
          <Nav.Menu icon={<UserIcon />} title={user.name} style={{ minWidth: '9rem' }}>
            <Nav.Item onClick={setSettingsOpen}>Mes préférences</Nav.Item>
            <Nav.Item onClick={handleDisconnect}>Me déconnecter</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </header>
  );
};

export default GameInterfaceHeader;

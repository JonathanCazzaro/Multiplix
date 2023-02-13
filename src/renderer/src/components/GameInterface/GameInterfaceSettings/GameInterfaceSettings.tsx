import React, { useState } from 'react';
import { Divider, Drawer } from 'rsuite';
import user from '../../../services/user';
import NameForm from './NameForm';
import TablesChoiceForm from './TablesChoiceForm';
const { Header, Title, Body } = Drawer;

interface GameInterfaceSettingsProps {
  isOpen: boolean;
  isPlaying: boolean;
  close: () => void;
}

const GameInterfaceSettings: React.FC<GameInterfaceSettingsProps> = ({ close, isOpen, isPlaying }) => {
  const [name, setName] = useState(user.name);

  const handleClose = () => {
    setName(user.name);
    close();
  };

  return (
    <Drawer placement="right" open={isOpen} onClose={handleClose} size="xs">
      <Header>
        <Title>Mes préférences</Title>
      </Header>
      <Body>
        {isPlaying && (
          <p style={{ color: 'firebrick', fontSize: '.85rem', marginBottom: '1rem' }}>
            Tu ne peux pas modifier tes préférences quand tu es en jeu !
          </p>
        )}
        <NameForm name={name} setName={setName} disabled={isPlaying} />
        <Divider />
        <TablesChoiceForm user={user} disabled={isPlaying} />
      </Body>
    </Drawer>
  );
};

export default GameInterfaceSettings;

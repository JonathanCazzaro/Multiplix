import React, { useState } from 'react';
import { Divider, Nav, Panel } from 'rsuite';
import MultiplixFaceImgSource from '../../../assets/images/multiplix_face1.png';
import game from '../../../services/game';
import MultiplicationTable from './MultiplicationTable';

const GameInterfaceRevising: React.FC = () => {
  const [currentTable, setCurrentTable] = useState(1);

  return (
    <Panel className="gameinterface__revising" bodyFill>
      <div className="gameinterface__revising__header">
        <img src={MultiplixFaceImgSource} alt="Image du visage du personnage Multiplix" />
        <p className="gameinterface__revising__header__bubble">
          Ici, on révise les tables de multiplication pour se préparer à passer des séries ! C'est très simple, il
          suffit de cliquer sur un onglet à gauche et la table s'affiche à droite.
        </p>
      </div>
      <Divider style={{ backgroundColor: 'darkgray' }} />
      <div className="gameinterface__revising__content">
        <Nav
          vertical
          activeKey={currentTable}
          onSelect={(value) => setCurrentTable(Number(value as string))}
          style={{ width: 'fit-content' }}
          appearance="tabs"
        >
          {Array.from({ length: game.maxTable }, (_, index) => index + 1).map((numeral) => (
            <Nav.Item key={`table-${numeral}`} active={currentTable === numeral} eventKey={numeral.toString()}>
              Table de {numeral}
            </Nav.Item>
          ))}
        </Nav>
        <MultiplicationTable numeral={currentTable} />
      </div>
    </Panel>
  );
};

export default GameInterfaceRevising;

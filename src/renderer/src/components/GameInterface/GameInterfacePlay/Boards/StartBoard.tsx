import React from 'react';
import {
  BsQuestionDiamondFill as QuestionIcon,
  BsHourglassSplit as TimerIcon,
  BsLifePreserver as HelpIcon,
  BsStack as TableIcon
} from 'react-icons/bs';
import { Button, Divider, Panel } from 'rsuite';
import { Serie } from '../../../../services/classes/serieModel';
import user from '../../../../services/user';

interface StartBoardProps {
  onStart: () => void;
  serie: Serie;
}

const StartBoard: React.FC<StartBoardProps> = ({ serie, onStart }) => (
  <Panel className="gameinterface__startboard" bodyFill>
    <h1>Tu as bien révisé ?</h1>
    <Divider style={{ backgroundColor: 'lightgray' }} />
    <p>
      Je sens que tu vas faire un max de points 😀
      <br />
      Jette un oeil aux détails de la série et clique sur le bouton en-dessous quand tu es prêt.e !
    </p>
    <div className="gameinterface__startboard__details">
      <div className="gameinterface__startboard__details__item">
        <QuestionIcon style={{ width: '5rem', height: '5rem' }} />
        <div className="gameinterface__startboard__details__item__content">
          <h2>Nombre de questions</h2>
          <p>{serie.length}</p>
        </div>
      </div>
      <div className="gameinterface__startboard__details__item">
        <TableIcon style={{ width: '5rem', height: '5rem' }} />
        <div className="gameinterface__startboard__details__item__content">
          <h2>Tables</h2>
          <p>{user.chosenTables.join(' - ')}</p>
        </div>
      </div>
      <div className="gameinterface__startboard__details__item">
        <TimerIcon style={{ width: '5rem', height: '5rem' }} />
        <div className="gameinterface__startboard__details__item__content">
          <h2>Temps de réponse</h2>
          <p>{serie.timeout} secondes</p>
        </div>
      </div>
      <div className="gameinterface__startboard__details__item">
        <HelpIcon style={{ width: '5rem', height: '5rem' }} />
        <div className="gameinterface__startboard__details__item__content">
          <h2>Nombre de jokers</h2>
          <p>{serie.remainingHelpTokens}</p>
        </div>
      </div>
    </div>
    <div className="gameinterface__startboard__buttons">
      <Button appearance="primary" size="lg" color="cyan" style={{ width: '12rem' }} onClick={onStart}>
        C'est parti !
      </Button>
    </div>
  </Panel>
);

export default StartBoard;

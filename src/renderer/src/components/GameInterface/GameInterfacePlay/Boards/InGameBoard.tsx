import { Serie } from '../../../../services/classes/serieModel';
import MultiplixFaceImgSource from '../../../../assets/images/multiplix_face1.png';
import {
  BsQuestionDiamondFill as QuestionIcon,
  BsLifePreserver as HelpIcon,
  BsTrophyFill as TrophyIcon
} from 'react-icons/bs';
import CalculationBoard from './CalculationBoard';
import { observer } from 'mobx-react-lite';
import { Button, Panel } from 'rsuite';
import TextBubble from '../TextBubble';
import { User } from '../../../../services/classes/userModel';
import game from '../../../../services/game';
import { usePlay } from '../../../../hooks/usePlay';
import { useEffect } from 'react';
import audioPlayer from '../../../../services/audioPlayer';

interface InGameBoardProps {
  serie: Serie;
  user: User;
  onFinish: (hasReward: boolean) => void;
}

const InGameBoard = observer(({ serie, user, onFinish }: InGameBoardProps) => {
  const { handlers, state } = usePlay(game, serie, user);

  useEffect(() => {
    return () => {
      audioPlayer.stopBackground();
    };
  }, []);

  return (
    <Panel className="gameinterface__playboard" bodyFill>
      <div className="gameinterface__playboard__header">
        <img src={MultiplixFaceImgSource} alt="Image du visage du personnage Multiplix" />
        <TextBubble content={state.bubbleContent} />
      </div>
      <div className="gameinterface__playboard__indicators">
        <div className="gameinterface__playboard__indicators__item gameinterface__playboard__indicators__item--timer">
          <div
            className={`timer-long ${state.timer !== null && state.timer < 3 && 'timer-short'}`}
            style={
              state.timer !== null
                ? { maxWidth: `${(state.hasDelayPassed ? state.timer - 1 : state.timer) * 10}%` }
                : undefined
            }
          ></div>
        </div>
        <div className="gameinterface__playboard__indicators__item">
          <QuestionIcon />
          <span>{state.remainingQuestions}</span>
        </div>
        <div className="gameinterface__playboard__indicators__item">
          <TrophyIcon />
          <span>{serie.score}</span>
        </div>
        <div className="gameinterface__playboard__indicators__item">
          <HelpIcon />
          <span>{serie.remainingHelpTokens}</span>
        </div>
      </div>
      <CalculationBoard
        calculation={state.currentCalculation}
        serie={serie}
        isTimeRunning={state.isTimeRunning}
        onSubmitted={handlers.handleFinishQuestion}
      />
      <Button
        disabled={state.isTimeRunning}
        onClick={() => (state.remainingQuestions ? handlers.handlePlay() : handlers.handleFinishSerie(onFinish))}
        size="lg"
        appearance="primary"
        color="cyan"
        style={{ margin: '.5rem 0 0 auto', display: 'block', width: '18rem' }}
      >
        {!state.currentCalculation
          ? 'Lancer la première question'
          : state.remainingQuestions
          ? 'Lancer la question suivante'
          : 'Terminer la série'}
      </Button>
    </Panel>
  );
});

export default InGameBoard;

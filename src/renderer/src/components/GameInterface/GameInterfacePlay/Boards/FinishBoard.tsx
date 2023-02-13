import { observer } from 'mobx-react-lite';
import { Button, Divider, Panel } from 'rsuite';
import { Serie } from '../../../../services/classes/serieModel';
import TrophyImgSrc from '../../../../assets/images/trophy.png';

interface FinishBoardProps {
  onRestart: () => void;
  onQuit: () => void;
  serie: Serie;
  hasReward: boolean;
}

const FinishBoard = observer(({ onRestart, onQuit, serie, hasReward }: FinishBoardProps) => {
  const successRate = serie.getSuccessRate();

  return (
    <Panel className="gameinterface__finishboard" bodyFill>
      <h1>La série est terminée !</h1>
      <Divider style={{ backgroundColor: 'lightgray' }} />
      <p className="gameinterface__finishboard__stats">
        Tu as obtenu <span>{successRate}%</span> de réponses correctes, qui t'ont rapporté <span>{serie.score}</span>{' '}
        points.
      </p>
      <p>
        {successRate && successRate > 50
          ? "C'est pas mal du tout 👏 continue comme ça et tu marqueras l'histoire !"
          : 'Il y a encore un peu de travail à fournir 😀 mais je suis sûr que tu vas bientôt cartonner !'}
      </p>
      {hasReward && (
        <div className={`gameinterface__finishboard__trophy show-trophy`}>
          <img src={TrophyImgSrc} alt="Visuel de trophée" />
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>Félicitations !</p>
          <p>
            Tu viens de passer un palier. Un trophée t'attend dans la page{' '}
            <span style={{ fontWeight: 600 }}>Mes récompenses</span> !
          </p>
        </div>
      )}
      <div className="gameinterface__finishboard__buttons">
        <Button appearance="ghost" onClick={onRestart}>
          Recommencer une série
        </Button>
        <Button appearance="primary" color="cyan" onClick={onQuit}>
          Retourner à l'accueil
        </Button>
      </div>
    </Panel>
  );
});

export default FinishBoard;

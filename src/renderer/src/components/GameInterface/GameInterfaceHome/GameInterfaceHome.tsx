import React from 'react';
import { Button, FlexboxGrid, Message, Panel, Progress } from 'rsuite';
import user from '../../../services/user';
import MultiplixImgSource from '../../../assets/images/multiplix.png';

interface GameInterfaceHomeProps {
  setPage: (page: Multiplix.Page) => void;
}

const GameInterfaceHome: React.FC<GameInterfaceHomeProps> = ({ setPage }) => {
  const totalCalculations = user.totalCalculations;
  const totalCorrectAnswers = user.totalCorrectAnswers;
  const totalSuccessRate = user.totalSuccessRate;

  return (
    <div>
      <Panel
        className="gameinterface__home"
        bodyFill
        header={
          <div className="gameinterface__home__header">
            <div>
              <h1>Bienvenue {user.name} !</h1>
              <div style={{ lineHeight: '1.75rem' }}>
                Voyons un peu où tu en es !<br />
                {totalCalculations ? (
                  <>
                    D'après ce que je peux voir, tu as déjà réalisé {totalCalculations} calcul
                    {totalCalculations > 1 ? 's' : ''} et donné {totalCorrectAnswers}
                    {totalCorrectAnswers > 1 ? ' bonnes réponses' : ' bonne réponse'} !
                    <Progress.Line
                      status="active"
                      percent={totalSuccessRate}
                      className="gameinterface__home__totalsuccessrate"
                    />
                    {totalSuccessRate < 50
                      ? 'Révise encore un peu tes tables et ce pourcentage de réussite va grimper !'
                      : totalSuccessRate > 80
                      ? 'Ouh là là ça va Einstein ?! Tu cartonnes dis-donc !!!'
                      : "Super progression ! Encore quelques efforts et les tables n'auront plus de secrets pour toi !"}
                  </>
                ) : (
                  <>
                    Je vois que tu n'as encore passé aucune série ! Allez, il est temps de se lancer 😀 Clique sur un
                    des boutons ci-dessous pour Lancer une série ou pour Réviser.
                    <div style={{ display: 'flex', marginTop: '1.5rem', gap: '1rem' }}>
                      <Button appearance="primary" color="cyan" onClick={() => setPage('game')}>
                        Lancer une série
                      </Button>
                      <Button appearance="ghost" color="cyan" onClick={() => setPage('revising')}>
                        Réviser
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <img src={MultiplixImgSource} alt="Image du personnage Multiplix" />
          </div>
        }
      >
        {totalCalculations ? (
          <>
            <div className="gameinterface__home__content">
              <h2>Tes réussites par table</h2>
              <FlexboxGrid justify="center">
                {user.achievements.map(({ calculations, successRate, table }) =>
                  calculations ? (
                    <FlexboxGrid.Item key={`table-${table}`} colspan={4} className="gameinterface__home__statcard">
                      <p>Table des {table}</p>
                      <Progress.Circle percent={successRate} className="gameinterface__home__statcard__progress" />
                    </FlexboxGrid.Item>
                  ) : null
                )}
              </FlexboxGrid>
            </div>
            <Message showIcon type="info" header="Mon conseil" style={{ backgroundColor: 'lightsteelblue' }}>
              Tu devrais réviser les tables sur lesquelles tu as moins de 50% de réussite. Entre 50% et 80%, fais-toi un
              maximum de séries pour progresser ! Au-delà de 80%, un tout petit effort, tu y es presque 😉
            </Message>
          </>
        ) : (
          <></>
        )}
      </Panel>
    </div>
  );
};

export default GameInterfaceHome;

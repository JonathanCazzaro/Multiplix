import {
  BsQuestionDiamondFill as QuestionIcon,
  BsLifePreserver as HelpIcon,
  BsTrophyFill as TrophyIcon
} from 'react-icons/bs';

export const useMultiplixComment = () => {
  return (type: Multiplix.CommentType, data?: number): JSX.Element[] => {
    switch (type) {
      case 'instructions':
        return [
          <>
            Quelques repères avant de commencer ! Le <span style={{ fontWeight: 600 }}>temps</span>. Tu vois la barre
            verte ? A chaque nouvelle question, elle diminuera avec le temps qui passe. Une fois vide, le temps sera
            écoulé&nbsp;!
          </>,
          <>
            La <span style={{ fontWeight: 600 }}>progression</span>. L'indicateur avec l'icône{' '}
            <QuestionIcon style={{ padding: '.15rem .25rem 0 .25rem', transform: 'scale(2)' }} /> te donne le nombre de
            questions restantes avant de terminer la série.
          </>,
          <>
            Le <span style={{ fontWeight: 600 }}>score</span>. L'indicateur avec l'icône{' '}
            <TrophyIcon style={{ padding: '.15rem .25rem 0 .25rem', transform: 'scale(2)' }} /> te montre le nombre de
            points gagnés depuis le début de la série. Attention, il faut terminer la série pour que les points soient
            ensuite comptabilisés&nbsp;!
          </>,
          <>
            Enfin, les <span style={{ fontWeight: 600 }}>jokers</span>. L'indicateur avec l'icône{' '}
            <HelpIcon style={{ padding: '.15rem .25rem 0 .25rem', transform: 'scale(2)' }} /> te donne le nombre de
            jokers qu'il te reste pour la série en cours. Par contre, il faut garder en tête qu'en utilisant un joker on
            gagne beaucoup moins de points...
          </>
        ];
      case 'times-up':
        return data
          ? [
              <>
                <span style={{ fontSize: '2rem', fontWeight: 500, color: 'firebrick' }}>Hop</span>{' '}
                <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'firebrick' }}>Hop</span>{' '}
                <span style={{ color: 'firebrick' }}>Hop</span>
                ... Le temps est écoulé ! La réponse à ce calcul était{' '}
                <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>{data}</span>. Dommage, mais tu feras mieux la
                prochaine fois&nbsp;😉
              </>
            ]
          : [];
      case 'correct-answer':
        return data
          ? [
              <>
                <span style={{ fontSize: '2rem', fontWeight: 600, color: 'green' }}>Bravo !</span> Et oui c'était la
                bonne réponse 😃
                <br />
                Voilà{' '}
                <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                  {data}&nbsp;point{data > 1 ? 's' : ''}
                </span>{' '}
                que tu mets dans ta besace. Continue comme ça&nbsp;!
              </>
            ]
          : [];
      case 'wrong-answer':
        return data
          ? [
              <>
                <span style={{ fontSize: '2rem', fontWeight: 600, color: 'firebrick' }}>Mauvaise réponse !</span>{' '}
                Malheureusement, c'est <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>{data}</span> qu'il
                fallait répondre 🥴 Allez ce n'est pas bien grave, tu vas te rattraper&nbsp;!
              </>
            ]
          : [];
      case 'waiting':
        return [<>A toi de jouer... Concentration maximum !</>];
    }
  };
};

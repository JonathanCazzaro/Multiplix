import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'rsuite';
import { Serie } from '../../../../services/classes/serieModel';
import { BsLifePreserver as HelpIcon } from 'react-icons/bs';

interface CalculationBoardProps {
  calculation?: Multiplix.Services.Calculation | null;
  serie: Serie;
  isTimeRunning: boolean;
  onSubmitted: (score: number) => void;
}

const CalculationBoard: React.FC<CalculationBoardProps> = ({ calculation, serie, isTimeRunning, onSubmitted }) => {
  const [answer, setAnswer] = useState<number>();
  const [withHelp, setWithHelp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetValue: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (isTimeRunning) {
      if (!target.value) {
        setAnswer(undefined);
      } else {
        const parsedValue = parseInt(target.value, 10);
        if (parsedValue) setAnswer(parsedValue);
      }
    }
  };

  const handleUseJoker = () => {
    setWithHelp(true);
    serie.useHelpToken();
  };

  const handleSubmit = (data: React.FormEvent<HTMLFormElement> | number) => {
    let actualAnswer: number | undefined;
    if (typeof data !== 'number') {
      data.preventDefault();
      actualAnswer = answer;
    } else {
      actualAnswer = data;
      setAnswer(data);
    }
    if (calculation && actualAnswer && isTimeRunning) {
      const score = serie.submitAnswer(calculation.id, actualAnswer, withHelp);
      onSubmitted(score);
    }
  };

  useEffect(() => {
    if (calculation) {
      setAnswer(undefined);
      setWithHelp(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [calculation]);

  return (
    <div className={`gameinterface__playboard__calculation ${calculation ? 'show-calculation' : ''}`}>
      <div className="gameinterface__playboard__calculation__content">
        <p className="gameinterface__playboard__calculation__question">Combien font...</p>
        <p className="gameinterface__playboard__calculation__numerals">
          <span>{calculation?.table || 0}</span> &#215; <span>{calculation?.factor || 0}</span>
        </p>
        <form className="gameinterface__playboard__calculation__answer" onSubmit={handleSubmit}>
          {withHelp ? (
            <div className="gameinterface__playboard__calculation__answer__suggestions">
              <p>Clique sur la bonne réponse !</p>
              <ul>
                {calculation?.suggestions.map((suggestion) => (
                  <li key={`suggestion-${suggestion}`}>
                    <Button
                      appearance="primary"
                      color={
                        !calculation || isTimeRunning || suggestion !== answer
                          ? undefined
                          : answer === calculation.result
                          ? 'green'
                          : 'red'
                      }
                      size="lg"
                      style={{ width: '3.5rem' }}
                      onClick={() => isTimeRunning && handleSubmit(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="gameinterface__playboard__calculation__answer__input">
              <label htmlFor="answer">Ta réponse</label>
              <input
                ref={inputRef}
                required
                type="text"
                name="answer"
                id="answer"
                className={
                  !calculation || isTimeRunning
                    ? undefined
                    : answer === calculation.result
                    ? 'correct-answer'
                    : 'wrong-answer'
                }
                value={answer || ''}
                onChange={handleSetValue}
              />
            </div>
          )}
          <div
            className={`gameinterface__playboard__calculation__answer__buttons ${
              withHelp ? 'hide-calculation-buttons' : 'show-calculation-buttons'
            }`}
          >
            <Button type="submit" appearance="primary" color="green" disabled={!isTimeRunning}>
              Je valide !
            </Button>
            <Button
              type="button"
              appearance="primary"
              color="red"
              className="gameinterface__playboard__calculation__usejoker"
              disabled={!isTimeRunning || !serie.remainingHelpTokens}
              onClick={handleUseJoker}
            >
              <HelpIcon />
              {serie.remainingHelpTokens ? "J'ai besoin d'aide" : 'Jokers épuisés !'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalculationBoard;

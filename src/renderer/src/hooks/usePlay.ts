import { useEffect, useState } from 'react';
import audioPlayer from '../services/audioPlayer';
import { Game } from '../services/classes/gameModel';
import { Serie } from '../services/classes/serieModel';
import { User } from '../services/classes/userModel';
import { useMultiplixComment } from './useMultiplixComment';
import { useTimer } from './useTimer';

export const usePlay = (game: Game, serie: Serie, user: User) => {
  const getComment = useMultiplixComment();

  const [currentCalculation, setCurrentCalculation] = useState<Multiplix.Services.Calculation | null | undefined>();
  const [bubbleContent, setBubbleContent] = useState(getComment('instructions'));
  const [serieResults, setSerieResults] = useState<[number, boolean][]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState(serie.length);

  const handleTimeoutExpires = () => {
    if (currentCalculation) {
      setBubbleContent(getComment('times-up', currentCalculation.result));
      setSerieResults([...serieResults, [currentCalculation.table, false]]);
      serie.submitAnswer(currentCalculation.id);
      audioPlayer.playEvent('timesup');
    }
  };

  const { startTimer, stopTimer, timer, hasDelayPassed, isTimeRunning } = useTimer({
    totalTime: serie.timeout,
    delay: 1000,
    onTimerEnds: handleTimeoutExpires
  });

  const handlePlay = () => {
    setCurrentCalculation(serie.getCalculation());
    setRemainingQuestions(remainingQuestions - 1);
    setBubbleContent(getComment('waiting'));
    startTimer();
  };

  const handleFinishQuestion = (score: number) => {
    if (currentCalculation) {
      setSerieResults([...serieResults, [currentCalculation.table, !!score]]);
      stopTimer();
      setBubbleContent(getComment(score ? 'correct-answer' : 'wrong-answer', score || currentCalculation.result));
      audioPlayer.playEvent(score ? 'success' : 'fail');
    }
  };

  const handleFinishSerie = async (callback: (hasReward: boolean) => void) => {
    for (const [table, success] of serieResults) {
      await user.setAchievement(table, success);
    }
    let hasReward = false;
    if (user.score + serie.score >= game.nextLevel) {
      if (user.rewards.length < game.rewardsQuantity) {
        await user.setReward();
        audioPlayer.playEvent('endserie');
        hasReward = true;
      }
    }
    await user.setScore(serie.score);
    callback(hasReward);
  };

  useEffect(() => {
    if (isTimeRunning) audioPlayer.playBackground();
    else audioPlayer.stopBackground();
  }, [isTimeRunning]);

  return {
    handlers: { handlePlay, handleFinishQuestion, handleFinishSerie },
    state: {
      bubbleContent,
      timer,
      hasDelayPassed,
      isTimeRunning,
      remainingQuestions,
      currentCalculation
    }
  };
};

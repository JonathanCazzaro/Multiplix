import { useEffect, useState } from 'react';

interface UseTimerProps {
  totalTime: number;
  intervalTimeout?: number;
  timerDecrementation?: number;
  onTimerEnds?: () => void;
  delay?: number;
}

export const useTimer = ({
  totalTime,
  intervalTimeout = 1000,
  timerDecrementation = 1,
  delay,
  onTimerEnds
}: UseTimerProps) => {
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [hasDelayPassed, setHasDelayPassed] = useState(delay ? false : true);

  const startTimer = () => {
    setTimer(totalTime);
    setIsTimeRunning(true);
    setTimeout(() => {
      if (delay) setHasDelayPassed(true);
      setIntervalId(
        window.setInterval(() => {
          setTimer((value) => value! - timerDecrementation);
        }, intervalTimeout)
      );
    }, delay || 0);
  };
  const stopTimer = () => {
    if (intervalId) {
      setIsTimeRunning(false);
      clearTimeout(intervalId);
      setIntervalId(null);
      if (delay) setHasDelayPassed(false);
    }
  };

  useEffect(() => {
    if (!timer && intervalId) {
      setIsTimeRunning(false);
      clearTimeout(intervalId);
      setIntervalId(null);
      if (delay) setHasDelayPassed(false);
      if (onTimerEnds) onTimerEnds();
    }
  }, [timer]);

  return { startTimer, stopTimer, timer, hasDelayPassed, isTimeRunning };
};

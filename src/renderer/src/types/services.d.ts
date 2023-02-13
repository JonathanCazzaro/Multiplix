/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Multiplix.Services {
  type Achievement = {
    table: number;
    calculations: number;
    correctAnswers: number;
    successRate: number;
  };

  type Calculation = {
    id: number;
    table: number;
    factor: number;
    result: number;
    suggestions: number[];
    passed: boolean;
  };

  type ScoreGridRow = {
    table: number;
    baseScore: number;
    baseScoreWithHelp: number;
    coefficients?: FactorRangeCoef[];
  };

  type FactorRangeCoef = {
    range: [number, number];
    coefficient: number;
  };

  type Reward = {
    id: number;
    isNew: boolean;
  };

  type AudioEvent = 'success' | 'fail' | 'timesup' | 'endserie';

  type UserCredentials = {
    name: string;
    password: string;
  };

  type User = UserCredentials & {
    id?: number;
    score: number;
    rewards: Reward[];
    achievements: Achievement[];
    chosenTables: number[];
  };

  interface UserModel {
    name: string;
    score: number;
    rewards: Reward[];
    chosenTables: number[];
    achievements: Achievement[];
    totalCalculations: number;
    totalCorrectAnswers: number;
    totalSuccessRate: number;
    signIn: (user: UserCredentials) => Promise<void>;
    logIn: (user: UserCredentials) => Promise<User>;
    setName: (name: string) => Promise<void>;
    setReward: () => Promise<void>;
    updateRewardState: (id: number) => Promise<void>;
    setScore: (score: number) => Promise<number>;
    setChosenTables: (chosenTables: number[]) => Promise<void>;
    setAchievement: (table: number, isSuccess: boolean) => Promise<void>;
  }

  interface GameModel {
    maxTable: number;
    scoreGrid: ScoreGridRow[];
    rewardsQuantity: number;
    nextLevel: number;
    setNextLevel: (score: number) => number;
  }

  interface SerieModel {
    score: number;
    length: number;
    timeout: number;
    remainingHelpTokens: number;
    getCalculation: () => Calculation | null;
    submitAnswer: (calculationId: number, answer: number, withHelp: boolean) => number;
    useHelpToken: () => void;
    getSuccessRate: () => number | null;
    reset: () => void;
  }

  interface AudioPlayerModel {
    playEvent: (event: AudioEvent) => void;
    playBackground: () => void;
    stopBackground: () => void;
    setRandomBackgroundSource: () => void;
  }
}

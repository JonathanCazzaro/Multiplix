import { Game } from './classes/gameModel';

const game = new Game({
  levelStep: 250,
  maxTable: 10,
  rewardsQuantity: 28,
  scoreGrid: [
    { table: 1, baseScore: 1, baseScoreWithHelp: 1 },
    {
      table: 2,
      baseScore: 2,
      baseScoreWithHelp: 1,
      coefficients: [{ range: [6, 9], coefficient: 2 }]
    },
    {
      table: 3,
      baseScore: 3,
      baseScoreWithHelp: 2,
      coefficients: [
        { range: [4, 7], coefficient: 2 },
        { range: [8, 9], coefficient: 3 }
      ]
    },
    {
      table: 4,
      baseScore: 4,
      baseScoreWithHelp: 2,
      coefficients: [
        { range: [3, 5], coefficient: 2 },
        { range: [6, 9], coefficient: 4 }
      ]
    },
    {
      table: 5,
      baseScore: 5,
      baseScoreWithHelp: 3,
      coefficients: [{ range: [5, 7], coefficient: 3 }]
    },
    {
      table: 6,
      baseScore: 6,
      baseScoreWithHelp: 3,
      coefficients: [
        { range: [3, 5], coefficient: 2 },
        { range: [6, 9], coefficient: 4 }
      ]
    },
    {
      table: 7,
      baseScore: 7,
      baseScoreWithHelp: 3,
      coefficients: [
        { range: [3, 4], coefficient: 2 },
        { range: [5, 7], coefficient: 4 },
        { range: [8, 9], coefficient: 5 }
      ]
    },
    {
      table: 8,
      baseScore: 8,
      baseScoreWithHelp: 4,
      coefficients: [
        { range: [3, 4], coefficient: 2 },
        { range: [5, 7], coefficient: 4 },
        { range: [8, 9], coefficient: 5 }
      ]
    },
    {
      table: 9,
      baseScore: 9,
      baseScoreWithHelp: 4,
      coefficients: [
        { range: [3, 4], coefficient: 2 },
        { range: [5, 7], coefficient: 4 },
        { range: [8, 9], coefficient: 5 }
      ]
    },
    { table: 10, baseScore: 2, baseScoreWithHelp: 1 }
  ]
});

export default game;

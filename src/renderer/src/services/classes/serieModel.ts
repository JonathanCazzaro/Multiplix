import { action, computed, makeObservable, observable } from 'mobx';
import { getRandomFactor, getRandomTable, getSuggestions } from '../../utils/algo';
import game from '../game';

interface SerieProps {
  helpTokensAmount: number;
  length: number;
  timeout: number;
  tables: number[];
}

export class Serie implements Multiplix.Services.SerieModel {
  @observable private _helpTokensAmount: number;
  @observable private _score: number[] = [];
  private readonly _constructTimeout: number;
  private readonly _constructTables: number[];
  private readonly _constructLength: number;
  private readonly _constructHelpTokensAmount: number;
  private readonly _calculations: Multiplix.Services.Calculation[] = [];

  constructor({ helpTokensAmount, tables, length, timeout }: SerieProps) {
    this._helpTokensAmount = helpTokensAmount;
    this._constructTimeout = timeout;
    this._constructLength = length;
    this._constructTables = tables;
    this._constructHelpTokensAmount = helpTokensAmount;
    this.setCalculations();
    makeObservable(this);
  }

  @action private setCalculations() {
    this._score.length = 0;
    this._calculations.length = 0;
    for (let i = 0; i < this._constructLength; i++) {
      const randomTable = getRandomTable(this._constructTables);
      const randomFactor = getRandomFactor(10, randomTable, this._calculations);
      const result = randomTable * randomFactor;
      const suggestions = getSuggestions(4, this._constructTables, result);
      this._calculations.push({
        id: this._calculations.length + 1,
        table: randomTable,
        factor: randomFactor,
        result,
        suggestions,
        passed: false
      });
    }
  }

  @computed get score() {
    return this._score.length ? this._score.reduce((previous, next) => previous + next) : 0;
  }

  @computed get remainingHelpTokens() {
    return this._helpTokensAmount;
  }

  get timeout() {
    return this._constructTimeout;
  }

  get length() {
    return this._calculations.length;
  }

  getSuccessRate() {
    if (!this._calculations.every(({ passed }) => passed)) return null;
    const correctAnswersAmount = this._score.filter(Boolean).length;
    return Math.round((correctAnswersAmount / this._calculations.length) * 100);
  }

  getCalculation() {
    return this._calculations.find(({ passed }) => !passed) || null;
  }

  @action useHelpToken() {
    if (this._helpTokensAmount) this._helpTokensAmount--;
  }

  @action submitAnswer(calculationId: number, answer?: number, withHelp?: boolean) {
    const index = this._calculations.findIndex(({ id }) => id === calculationId);
    this._calculations[index].passed = true;
    const { factor, table, result } = this._calculations[index];
    if (answer !== result) {
      this._score.push(0);
      return 0;
    }
    const { baseScore, baseScoreWithHelp, coefficients } =
      game.scoreGrid[game.scoreGrid.findIndex((grid) => grid.table === table)];
    let score = withHelp ? baseScoreWithHelp : baseScore;
    const factorRange = coefficients?.find(({ range: [min, max] }) => factor >= min && factor <= max);
    if (factorRange) score = score * factorRange.coefficient;
    this._score.push(score);
    return score;
  }

  @action reset() {
    this._helpTokensAmount = this._constructHelpTokensAmount;
    this.setCalculations();
  }
}

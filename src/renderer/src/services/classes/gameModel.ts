import { action, computed, makeObservable, observable } from 'mobx';
import { GameInstanciationError } from '../../errors';

interface GameProps {
  levelStep: number;
  maxTable: number;
  scoreGrid: Multiplix.Services.ScoreGridRow[];
  rewardsQuantity: number;
}

export class Game implements Multiplix.Services.GameModel {
  private readonly _levelStep: number;
  @observable private _nextLevel: number;
  private readonly _maxTable: number;
  private readonly _rewardsQuantity: number;
  private readonly _scoreGrid: Multiplix.Services.ScoreGridRow[];

  constructor({ levelStep, maxTable, scoreGrid, rewardsQuantity }: GameProps) {
    if (scoreGrid.find(({ table }) => table > maxTable))
      throw new GameInstanciationError(
        'The scoreGrid prop contains definitions for tables higher than the value of maxTable.'
      );
    else this._scoreGrid = scoreGrid;
    this._levelStep = this._nextLevel = levelStep;
    this._rewardsQuantity = rewardsQuantity;
    this._maxTable = maxTable;
    makeObservable(this);
  }

  get maxTable() {
    return this._maxTable;
  }

  get scoreGrid() {
    return this._scoreGrid;
  }

  get rewardsQuantity() {
    return this._rewardsQuantity;
  }

  @computed get nextLevel() {
    return this._nextLevel;
  }

  @action setNextLevel(score: number) {
    this._nextLevel = Math.ceil(score / this._levelStep) * this._levelStep;
    return this._nextLevel;
  }
}

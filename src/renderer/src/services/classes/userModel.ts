import { action, computed, makeObservable, observable, toJS } from 'mobx';
import { UndefinedUserError, UserAlreadyExistsError, WrongCredentialsError } from '../../errors';
import { MultiplixDatabase } from '../../storage/classes/MultiplixDatabase';
import game from '../game';

export class User implements Multiplix.Services.UserModel {
  private readonly database: MultiplixDatabase;

  private _id = 0;
  private _name = '';
  @observable private _score = 0;
  @observable private _rewards: Multiplix.Services.Reward[] = [];
  @observable private _chosenTables: number[] = [];
  private _achievements: Multiplix.Services.Achievement[] = [];

  constructor(database: MultiplixDatabase) {
    this.database = database;
    makeObservable(this);
  }

  get name() {
    if (this._name) return this._name;
    else throw new UndefinedUserError();
  }

  @computed get score() {
    return this._score;
  }

  @computed get rewards() {
    return this._rewards;
  }

  @computed get chosenTables() {
    return this._chosenTables;
  }

  get achievements() {
    return this._achievements;
  }

  get totalCalculations() {
    return this._achievements.map(({ calculations }) => calculations).reduce((previous, next) => previous + next);
  }

  get totalCorrectAnswers() {
    return this._achievements.map(({ correctAnswers }) => correctAnswers).reduce((previous, next) => previous + next);
  }

  get totalSuccessRate() {
    return Math.round(
      this._achievements.map(({ successRate }) => successRate).reduce((previous, next) => previous + next) /
        this._achievements.filter(({ calculations }) => calculations).length
    );
  }

  async setName(name: string) {
    this._name = name;
    await this.database.users.update(this._id, {
      name: this._name
    });
  }

  async signIn({ name, password }: Multiplix.Services.UserCredentials) {
    const foundUser = await this.database.users.where('name').equals(name).first();
    if (foundUser) throw new UserAlreadyExistsError();
    await this.database.users.add({
      name,
      password,
      score: 0,
      rewards: [],
      chosenTables: [1, 2, 3],
      achievements: Array.from({ length: game.maxTable }, (_, index) => ({
        table: index + 1,
        calculations: 0,
        correctAnswers: 0,
        successRate: 0
      }))
    });
  }

  async logIn({ name, password }: Multiplix.Services.UserCredentials) {
    const foundUser = await this.database.users.where(['name', 'password']).equals([name, password]).first();
    if (!foundUser) throw new WrongCredentialsError();
    this._id = foundUser.id!;
    this._name = foundUser.name;
    this._score = foundUser.score;
    this._rewards = foundUser.rewards;
    this._achievements = foundUser.achievements;
    this._chosenTables = foundUser.chosenTables;
    return foundUser;
  }

  @action async setScore(score: number) {
    this._score += score;
    await this.database.users.update(this._id, {
      score: this._score
    });
    return this._score;
  }

  @action async setReward() {
    let rewardId: number;
    do {
      rewardId = Math.ceil(Math.random() * game.rewardsQuantity);
    } while (this._rewards.find(({ id }) => id === rewardId));
    this._rewards.push({ id: rewardId, isNew: true });
    await this.database.users.update(this._id, {
      rewards: toJS(this._rewards)
    });
  }

  @action async updateRewardState(id: number) {
    const index = this._rewards.findIndex((reward) => reward.id === id);
    if (index !== -1) {
      this._rewards[index].isNew = false;
      await this.database.users.update(this._id, {
        rewards: toJS(this._rewards)
      });
    }
  }

  @action async setChosenTables(chosenTables: number[]) {
    this._chosenTables = chosenTables;
    await this.database.users.update(this._id, {
      chosenTables: this._chosenTables.slice()
    });
  }

  async setAchievement(table: number, isSuccess: boolean) {
    const tableIndex = this._achievements.findIndex((achievement) => achievement.table === table);
    const relatedTable = this._achievements[tableIndex];
    relatedTable.calculations++;
    if (isSuccess) relatedTable.correctAnswers++;
    relatedTable.successRate = Math.round((relatedTable.correctAnswers / relatedTable.calculations) * 100);

    await this.database.users.update(this._id, {
      achievements: this._achievements
    });
  }
}

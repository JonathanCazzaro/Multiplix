export class UndefinedUserError extends Error {
  constructor(message?: string) {
    super(message || 'Username is not defined.');
    Object.setPrototypeOf(this, UndefinedUserError.prototype);
    this.name = 'UndefinedUsernameError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message || 'This username is already in use.');
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
    this.name = 'UserAlreadyExistsError';
  }
}

export class WrongCredentialsError extends Error {
  constructor(message?: string) {
    super(message || 'Provided credentials do not match any user.');
    Object.setPrototypeOf(this, WrongCredentialsError.prototype);
    this.name = 'WrongCredentialsError';
  }
}

export class GameInstanciationError extends Error {
  constructor(message?: string) {
    super(message || 'Something went wrong with the instanciation of the class Game.');
    Object.setPrototypeOf(this, GameInstanciationError.prototype);
    this.name = 'GameInstanciationError';
  }
}

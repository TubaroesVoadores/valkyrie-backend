/* eslint-disable max-classes-per-file */

class CustomError extends Error { }

export class InputError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

export class AuthorizationError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class InvalidInputError extends CustomError {
  constructor(message, errors) {
    super(message);
    this.name = 'InvalidInputError';
    this.errors = errors;
  }
}

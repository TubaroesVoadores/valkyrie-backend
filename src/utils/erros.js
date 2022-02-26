/* eslint-disable max-classes-per-file */

class CustomError extends Error { }

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

export class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class TimeoutError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class InvalidInputError extends CustomError {
  constructor(message, errors) {
    super(message);
    this.name = 'InvalidInputError';
    this.errors = errors;
  }
}

export class RequestError extends CustomError {
  constructor(message, status, errors) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.errors = errors;
  }
}

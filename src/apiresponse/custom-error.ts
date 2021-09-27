export abstract class CustomError extends Error {
  abstract statusCode: number;
  errorName?: string;

  constructor(message: string, stack = "") {
    super(message);

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

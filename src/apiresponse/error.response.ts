import { CustomError } from "./custom-error";

export class ErrorResponse extends CustomError {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public stack = ""
  ) {
    super(message);
    this.errorName = stack;

    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }
}

import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message:string="Not found", public stack?:string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

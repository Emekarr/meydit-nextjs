import BaseError from "./BaseError";

export default class ApplicationError extends BaseError {
  constructor(message: string, alert: boolean) {
    super("ApplicationError", message, alert);
  }
}

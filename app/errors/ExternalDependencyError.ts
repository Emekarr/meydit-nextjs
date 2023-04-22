import BaseError from "./BaseError";

export default class ExternalDependencyError extends BaseError {
  constructor(message: string) {
    super("ExternalDependencyError", message, true);
  }
}

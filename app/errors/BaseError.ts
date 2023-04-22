export default class CustomError extends Error {
  public alert: boolean;

  constructor(name: string, message: string, alert: boolean) {
    super(message);

    this.name = name;
    this.alert = alert;
    this.message = message;

    Error.captureStackTrace(this);
  }
}

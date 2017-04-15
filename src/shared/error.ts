export class Error {

  message: string;
  details: string;

  constructor(message?: string, details?: string) {
    this.message = message;
    this.details = details;
  }
}

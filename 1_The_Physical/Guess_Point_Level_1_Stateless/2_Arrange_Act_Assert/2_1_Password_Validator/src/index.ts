export interface IPasswordValidatorResult {
  result: boolean;
  errors?: string[];
}

export class PasswordValidatorResult implements IPasswordValidatorResult {
  result: boolean;
  errors?: string[];

  constructor(result: boolean, errors?: string[]) {
    this.result = result;
    this.errors = errors;
  }

  public addError(...errors: string[]): void {
    this.result = false;
    if (!this.errors) {
      this.errors = [];
    }
    this.errors.push(...errors);
  }
}

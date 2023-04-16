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
    throw new Error("Not implemented");
  }
}

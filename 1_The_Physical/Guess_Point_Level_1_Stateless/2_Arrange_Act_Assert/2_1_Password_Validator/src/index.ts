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

export class PasswordValidator {
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  public validate(): IPasswordValidatorResult {
    throw new Error("Not implemented");
  }
}

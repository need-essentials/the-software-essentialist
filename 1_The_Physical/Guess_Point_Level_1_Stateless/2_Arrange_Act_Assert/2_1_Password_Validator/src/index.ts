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
    const result = new PasswordValidatorResult(true);

    if (this.password.length < 5) {
      result.addError("Password length must be at least 5 characters");
    }

    if (this.password.length > 15) {
      result.addError("Password length must be at most 15 characters");
    }

    if (!/\d/.test(this.password)) {
      result.addError("Password must contain a digit");
    }

    return result;
  }
}

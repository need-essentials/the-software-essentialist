import {
  AbstractPasswordValidatorHandler,
  IPasswordValidatorHandler,
} from "./AbstractPasswordValidatorHandler";

export interface IPasswordValidatorResult {
  result: boolean;
  errors?: string[];
}

export class LengthValidator extends AbstractPasswordValidatorHandler {
  handle(password: string, result: PasswordValidatorResult): void {
    if (password.length < 5) {
      result.addError("Password length must be at least 5 characters");
    } else if (password.length > 15) {
      result.addError("Password length must be at most 15 characters");
    }
    super.handle(password, result);
  }
}

export class DigitValidator extends AbstractPasswordValidatorHandler {
  handle(password: string, result: PasswordValidatorResult): void {
    if (!/[0-9]/.test(password)) {
      result.addError("Password must contain a digit");
    }
    super.handle(password, result);
  }
}

export class CaseValidator extends AbstractPasswordValidatorHandler {
  handle(password: string, result: PasswordValidatorResult): void {
    if (!/[A-Z]/.test(password)) {
      result.addError("Password must contain an uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      result.addError("Password must contain a lowercase letter");
    }
    super.handle(password, result);
  }
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
  private handler: IPasswordValidatorHandler;

  constructor(password: string) {
    this.password = password;
    this.handler = new LengthValidator()
      .setNext(new DigitValidator())
      .setNext(new CaseValidator());
  }

  public validate(): IPasswordValidatorResult {
    const result = new PasswordValidatorResult(true);

    this.handler.handle(this.password, result);

    return result;
  }
}

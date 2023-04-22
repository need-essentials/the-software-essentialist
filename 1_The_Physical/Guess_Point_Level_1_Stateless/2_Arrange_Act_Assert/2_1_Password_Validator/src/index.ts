import {
  AbstractPasswordValidatorHandler,
  IPasswordValidatorHandler,
} from "./AbstractPasswordValidatorHandler";

export interface IPasswordValidatorResult {
  result: boolean;
  errors?: string[];
}

export type PasswordValidatorHandler = (
  password: string,
  errors: string[]
) => string[];

export function lengthValidator(password: string, errors: string[]): string[] {
  if (password.length < 5) {
    return [...errors, "Password length must be at least 5 characters"];
  } else if (password.length > 15) {
    return [...errors, "Password length must be at most 15 characters"];
  }
  return errors;
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
    this.handler = new DigitValidator().setNext(new CaseValidator());
  }

  public validate(): IPasswordValidatorResult {
    const result = new PasswordValidatorResult(true);

    this.handler.handle(this.password, result);

    return result;
  }
}

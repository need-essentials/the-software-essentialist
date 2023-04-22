import { PasswordValidatorResult } from ".";

export interface IPasswordValidatorHandler {
  setNext(handler: IPasswordValidatorHandler): IPasswordValidatorHandler;
  handle(password: string, result: PasswordValidatorResult): void;
}

export abstract class AbstractPasswordValidatorHandler
  implements IPasswordValidatorHandler
{
  private nextHandler: IPasswordValidatorHandler | null = null;

  public setNext(
    handler: IPasswordValidatorHandler
  ): IPasswordValidatorHandler {
    this.nextHandler = handler;
    return this;
  }

  public handle(password: string, result: PasswordValidatorResult): void {
    if (this.nextHandler) {
      this.nextHandler.handle(password, result);
    }
  }
}
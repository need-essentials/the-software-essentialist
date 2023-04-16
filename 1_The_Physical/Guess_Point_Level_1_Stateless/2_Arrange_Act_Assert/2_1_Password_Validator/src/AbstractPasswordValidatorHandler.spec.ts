import { PasswordValidatorResult } from ".";
import { AbstractPasswordValidatorHandler } from "./AbstractPasswordValidatorHandler";

class TestHandler extends AbstractPasswordValidatorHandler {
  handle(password: string, result: PasswordValidatorResult): void {
    result.addError("Test error");
    super.handle(password, result);
  }
}

describe("AbstractPasswordValidatorHandler", () => {
  it("should set and call the next handler in the chain", () => {
    const handler1 = new TestHandler();
    const handler2 = new TestHandler();
    handler1.setNext(handler2);

    const result = new PasswordValidatorResult(true);
    handler1.handle("TestPassword", result);

    expect(result.result).toBeFalsy();
    expect(result.errors).toEqual(["Test error", "Test error"]);
  });

  it("should not call the next handler if not set", () => {
    const handler = new TestHandler();

    const result = new PasswordValidatorResult(true);
    handler.handle("TestPassword", result);

    expect(result.result).toBeFalsy();
    expect(result.errors).toEqual(["Test error"]);
  });
});

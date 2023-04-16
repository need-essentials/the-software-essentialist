import { PasswordValidator, PasswordValidatorResult } from "./index";

describe("password validator", () => {
  describe("PasswordValidator", () => {
    it("should initialize with the given password", () => {
      const password = "Test password";
      const validator = new PasswordValidator(password);
      expect(validator).toBeInstanceOf(PasswordValidator);
    });

    describe("validate", () => {
      it("should return a PasswordValidatorResult", () => {
        const password = "Test password";
        const validator = new PasswordValidator(password);
        const result = validator.validate();
        expect(result).toBeInstanceOf(PasswordValidatorResult);
      });

      it("should return a PasswordValidatorResult with result true", () => {
        const password = "Test password1";
        const validator = new PasswordValidator(password);
        const result = validator.validate();
        expect(result.result).toBeTruthy();
      });

      it("should return a PasswordValidatorResult with result false and errors when password length is less than 5", () => {
        const password = "1234";
        const validator = new PasswordValidator(password);
        const result = validator.validate();
        expect(result.result).toBeFalsy();
        expect(result.errors).toEqual([
          "Password length must be at least 5 characters",
        ]);
      });
    });
  });

  describe("PasswordValidatorResult", () => {
    it("should initialize with the given result and errors", () => {
      const result = new PasswordValidatorResult(true, ["Test error"]);
      expect(result.result).toBeTruthy();
      expect(result.errors).toEqual(["Test error"]);
    });

    it("should add errors and set the result to false", () => {
      const result = new PasswordValidatorResult(true);
      result.addError("New error 1", "New error 2");
      expect(result.result).toBeFalsy();
      expect(result.errors).toEqual(["New error 1", "New error 2"]);
    });

    it("should initialize without errors and add errors later", () => {
      const result = new PasswordValidatorResult(true);
      expect(result.errors).toBeUndefined();
      result.addError("New error 1");
      expect(result.errors).toEqual(["New error 1"]);
    });
  });
});

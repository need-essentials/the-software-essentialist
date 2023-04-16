import {
  CaseValidator,
  DigitValidator,
  LengthValidator,
  PasswordValidator,
  PasswordValidatorResult,
} from "./index";

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

      it("should return a PasswordValidatorResult with result false", () => {
        const password = "test";
        const validator = new PasswordValidator(password);
        const result = validator.validate();
        expect(result.result).toBeFalsy();
        expect(result.errors).toEqual([
          "Password length must be at least 5 characters",
          "Password must contain an uppercase letter",
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

  describe("LengthValidator", () => {
    it("should return error if the password is too short", () => {
      //Arrange
      const validator = new LengthValidator();
      const result = new PasswordValidatorResult(true);

      //Act
      validator.handle("Abc1", result);

      //Assert
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(
        "Password length must be at least 5 characters"
      );
    });

    it("should return error if the password is too long", () => {
      //Arrange
      const validator = new LengthValidator();
      const result = new PasswordValidatorResult(true);

      //Act
      validator.handle("123456789012345Ab", result);

      //Assert
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(
        "Password length must be at most 15 characters"
      );
    });
  });

  describe("DigitValidator", () => {
    it("should return error if the password does not contain a digit", () => {
      //Arrange
      const validator = new DigitValidator();
      const result = new PasswordValidatorResult(true);

      //Act
      validator.handle("Abcdef", result);

      //Assert
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain("Password must contain a digit");
    });
  });

  describe("CaseValidator", () => {
    it("should return error if the password does not contain an uppercase letter", () => {
      //Arrange
      const validator = new CaseValidator();
      const result = new PasswordValidatorResult(true);

      //Act
      validator.handle("abcdef1", result);

      //Assert
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(
        "Password must contain an uppercase letter"
      );
    });

    it("should return error if the password does not contain a lowercase letter", () => {
      //Arrange
      const validator = new CaseValidator();
      const result = new PasswordValidatorResult(true);

      //Act
      validator.handle("ABCDEF1", result);

      //Assert
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(
        "Password must contain a lowercase letter"
      );
    });
  });
});

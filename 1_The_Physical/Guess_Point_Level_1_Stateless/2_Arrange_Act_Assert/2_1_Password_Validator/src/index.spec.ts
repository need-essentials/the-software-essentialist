import {
  caseValidator,
  digitValidator,
  lengthValidator,
  passwordValidator,
} from "./index";

describe("password validator", () => {
  it("should return true if the password is valid", () => {
    //Arrange
    const password = "Test123";
    const validators = [lengthValidator, digitValidator, caseValidator];

    //Act
    const validation = passwordValidator(password, validators);

    //Assert
    expect(validation.result).toBe(true);
  });

  it("should return false if the password is invalid", () => {
    const useCases = [
      {
        password: "Test",
        errors: [
          "Password length must be at least 5 characters",
          "Password must contain a digit",
        ],
      },
      {
        password: "test123",
        errors: ["Password must contain an uppercase letter"],
      },
      {
        password: "TEST123",
        errors: ["Password must contain a lowercase letter"],
      },
      {
        password: "test",
        errors: [
          "Password length must be at least 5 characters",
          "Password must contain a digit",
          "Password must contain an uppercase letter",
        ],
      },
      {
        password: "TEST",
        errors: [
          "Password length must be at least 5 characters",
          "Password must contain a digit",
          "Password must contain a lowercase letter",
        ],
      },
    ];

    for (const useCase of useCases) {
      //Arrange
      const { password, errors } = useCase;
      const validators = [lengthValidator, digitValidator, caseValidator];

      //Act
      const validation = passwordValidator(password, validators);

      //Assert
      expect(validation.result).toBe(false);
      expect(validation.errors).toEqual(errors);
    }
  });

  describe("lengthValidator", () => {
    it("should return error if the password is too short", () => {
      //Arrange
      const password = "Test";
      const errors: string[] = [];

      //Act
      const result = lengthValidator(password, errors);

      //Assert
      expect(result).toContain("Password length must be at least 5 characters");
    });

    it("should return error if the password is too long", () => {
      //Arrange
      const password = "Test password that is too long";
      const errors: string[] = [];

      //Act
      const result = lengthValidator(password, errors);

      //Assert
      expect(result).toContain("Password length must be at most 15 characters");
    });
  });

  describe("digitValidator", () => {
    it("should return error if the password does not contain a digit", () => {
      //Arrange
      const password = "abcdef";
      const errors: string[] = [];

      //Act
      const result = digitValidator(password, errors);

      //Assert
      expect(result).toContain("Password must contain a digit");
    });

    it("should not return error if the password contains a digit", () => {
      //Arrange
      const password = "abcdef1";
      const errors: string[] = [];

      //Act
      const result = digitValidator(password, errors);

      //Assert
      expect(result).not.toContain("Password must contain a digit");
    });
  });

  describe("caseValidator", () => {
    it("should return error if the password does not contain an uppercase letter", () => {
      //Arrange
      const password = "abcdef1";
      const errors: string[] = [];

      //Act
      const result = caseValidator(password, errors);

      //Assert
      expect(result).toContain("Password must contain an uppercase letter");
    });

    it("should return error if the password does not contain a lowercase letter", () => {
      //Arrange
      const password = "ABCDEF1";
      const errors: string[] = [];

      //Act
      const result = caseValidator(password, errors);

      //Assert
      expect(result).toContain("Password must contain a lowercase letter");
    });
  });
});

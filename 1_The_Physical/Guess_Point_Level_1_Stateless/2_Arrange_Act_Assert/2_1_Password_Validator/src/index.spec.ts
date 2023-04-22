import { PasswordValidatorHandler, passwordValidator, pipe } from "./index";

describe("password validator", () => {
  it("should return true if the password is valid", () => {
    //Arrange
    const password = "Test123";

    //Act
    const validation = passwordValidator(password);

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

      //Act
      const validation = passwordValidator(password);

      //Assert
      expect(validation.result).toBe(false);
      expect(validation.errors).toEqual(errors);
    }
  });

  describe("pipe", () => {
    it("should return a function", () => {
      //Arrange
      const validators: PasswordValidatorHandler[] = [];

      //Act
      const result = pipe(validators);

      //Assert
      expect(typeof result).toBe("function");
    });

    it("should return a function that returns the errors", () => {
      //Arrange
      const validators = [
        (password: string, errors: string[]) => [...errors, "test"],
      ];
      const password = "test";
      const errors: string[] = [];

      //Act
      const result = pipe(validators)(password, errors);

      //Assert
      expect(result).toEqual(["test"]);
    });
  });
});

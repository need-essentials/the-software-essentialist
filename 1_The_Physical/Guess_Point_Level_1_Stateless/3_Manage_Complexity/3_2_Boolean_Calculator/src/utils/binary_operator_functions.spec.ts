import { OPERATOR } from "../enums";
import { binaryOperatorFunctions } from "./binary_operator_functions";

describe("binaryOperatorFunctions", () => {
  describe("AND operator", () => {
    it("should be a defined function", () => {
      expect(binaryOperatorFunctions[OPERATOR.AND]).toBeDefined();
    });

    it("should return true when both inputs are true: AND(TRUE, TRUE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.AND](true, true)).toBe(true);
    });

    it("should return false when either input is false: AND(TRUE, FALSE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.AND](true, false)).toBe(false);
    });

    it("should return false when either input is false: AND(FALSE, TRUE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.AND](false, true)).toBe(false);
    });

    it("should return false when both inputs are false: AND(FALSE, FALSE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.AND](false, false)).toBe(false);
    });
  });

  describe("OR operator", () => {
    it("should be a defined function", () => {
      expect(binaryOperatorFunctions[OPERATOR.OR]).toBeDefined();
    });

    it("should return true when both inputs are true: OR(TRUE, TRUE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.OR](true, true)).toBe(true);
    });

    it("should return true when either input is true: OR(TRUE, FALSE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.OR](true, false)).toBe(true);
    });

    it("should return true when either input is true: OR(FALSE, TRUE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.OR](false, true)).toBe(true);
    });

    it("should return false when both inputs are false: OR(FALSE, FALSE)", () => {
      expect(binaryOperatorFunctions[OPERATOR.OR](false, false)).toBe(false);
    });
  });
});

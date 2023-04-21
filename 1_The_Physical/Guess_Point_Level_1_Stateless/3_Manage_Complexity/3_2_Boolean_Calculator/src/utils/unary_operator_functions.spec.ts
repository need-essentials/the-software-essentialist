import { unaryOperatorFunctions } from "./unary_operator_functions";

describe("unaryOperatorFunctions", () => {
  describe("NOT operator", () => {
    it("should be a defined function", () => {
      expect(unaryOperatorFunctions["NOT"]).toBeDefined();
    });

    it("should negate the input value: NOT(FALSE) returns true", () => {
      expect(unaryOperatorFunctions["NOT"](false)).toBe(true);
    });

    it("should negate the input value: NOT(TRUE) returns false", () => {
      expect(unaryOperatorFunctions["NOT"](true)).toBe(false);
    });
  });
});

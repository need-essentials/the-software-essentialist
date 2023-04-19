import { parseBooleanValue, unaryOperatorFunctions } from "./index";

describe("boolean calculator", () => {
  describe("parseBooleanValue", () => {
    it("should return true for 'true'", () => {
      expect(parseBooleanValue("true")).toBeTruthy();
    });

    it("should return false for 'false'", () => {
      expect(parseBooleanValue("false")).toBeFalsy();
    });

    it("should throw an error for 'foo'", () => {
      expect(() => parseBooleanValue("foo")).toThrowError(
        "Invalid boolean value"
      );
    });
  });

  describe("unaryOperatorFunctions", () => {
    it("should return the NOT function for 'NOT'", () => {
      expect(unaryOperatorFunctions["NOT"]).toBeDefined();
    });

    it("should return true for NOT(false)", () => {
      expect(unaryOperatorFunctions["NOT"](false)).toBeTruthy();
    });

    it("should return false for NOT(true)", () => {
      expect(unaryOperatorFunctions["NOT"](true)).toBeFalsy();
    });
  });
});

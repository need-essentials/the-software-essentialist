import {
  binaryOperatorFunctions,
  parseBooleanValue,
  unaryOperatorFunctions,
} from "./index";

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

  describe("binaryOperatorFunctions", () => {
    describe("AND", () => {
      it("should return the AND function for 'AND'", () => {
        expect(binaryOperatorFunctions["AND"]).toBeDefined();
      });

      it("should return true for true AND true", () => {
        expect(binaryOperatorFunctions["AND"](true, true)).toBeTruthy();
      });

      it("should return false for true AND false", () => {
        expect(binaryOperatorFunctions["AND"](true, false)).toBeFalsy();
      });

      it("should return false for false AND true", () => {
        expect(binaryOperatorFunctions["AND"](false, true)).toBeFalsy();
      });

      it("should return false for false AND false", () => {
        expect(binaryOperatorFunctions["AND"](false, false)).toBeFalsy();
      });
    });

    describe("OR", () => {
      it("should return the OR function for 'OR'", () => {
        expect(binaryOperatorFunctions["OR"]).toBeDefined();
      });

      it("should return true for true OR true", () => {
        expect(binaryOperatorFunctions["OR"](true, true)).toBeTruthy();
      });

      it("should return true for true OR false", () => {
        expect(binaryOperatorFunctions["OR"](true, false)).toBeTruthy();
      });

      it("should return true for false OR true", () => {
        expect(binaryOperatorFunctions["OR"](false, true)).toBeTruthy();
      });

      it("should return false for false OR false", () => {
        expect(binaryOperatorFunctions["OR"](false, false)).toBeFalsy();
      });
    });
  });
});

import {
  binaryOperatorFunctions,
  parseBooleanValue,
  unaryOperatorFunctions,
  Tokenizer,
  Parser,
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

  describe("Tokenizer", () => {
    it("should tokenize a simple expression", () => {
      expect(new Tokenizer("true AND false OR TRUE").tokenize()).toEqual([
        "true",
        "AND",
        "false",
        "OR",
        "TRUE",
      ]);
    });
  });

  describe("AST Parser", () => {
    it("should parse a single value", () => {
      expect(new Parser(["TRUE"]).parse()).toEqual({
        type: "Literal",
        value: true,
      });
      expect(new Parser(["FALSE"]).parse()).toEqual({
        type: "Literal",
        value: false,
      });
    });

    it("should thow an expected error", () => {
      expect(() => new Parser(["Invalid"]).parse()).toThrowError(
        "Unexpected token"
      );
    });
  });
});

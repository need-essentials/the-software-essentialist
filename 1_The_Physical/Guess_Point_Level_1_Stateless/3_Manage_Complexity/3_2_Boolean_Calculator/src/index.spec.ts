import {
  Evaluator,
  Parser,
  Tokenizer,
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

    it("should tokenize a simple expression with parenthesis", () => {
      expect(new Tokenizer("NOT (true AND false)").tokenize()).toEqual([
        "NOT",
        ["true", "AND", "false"],
      ]);
    });
  });

  describe("Parser", () => {
    const parseExpression = (expression: string) => {
      const tokenizer = new Tokenizer(expression);
      const tokens = tokenizer.tokenize();
      const parser = new Parser(tokens);
      return parser.parse();
    };

    it("simple true and false values", () => {
      const ast1 = parseExpression("TRUE");
      const ast2 = parseExpression("FALSE");
      expect(ast1).toEqual({ type: "Literal", value: true });
      expect(ast2).toEqual({ type: "Literal", value: false });
    });

    it("basic NOT operation", () => {
      const ast = parseExpression("NOT TRUE");
      expect(ast).toEqual({
        type: "UnaryExpression",
        operator: "NOT",
        argument: { type: "Literal", value: true },
      });
    });

    it("basic AND operation", () => {
      const ast = parseExpression("TRUE AND FALSE");
      expect(ast).toEqual({
        type: "BinaryExpression",
        operator: "AND",
        left: { type: "Literal", value: true },
        right: { type: "Literal", value: false },
      });
    });

    it("basic OR operation", () => {
      const ast = parseExpression("TRUE OR FALSE");
      expect(ast).toEqual({
        type: "BinaryExpression",
        operator: "OR",
        left: { type: "Literal", value: true },
        right: { type: "Literal", value: false },
      });
    });

    it("nested expression", () => {
      const ast = parseExpression("TRUE AND (FALSE OR TRUE)");
      expect(ast).toEqual({
        type: "BinaryExpression",
        operator: "AND",
        left: { type: "Literal", value: true },
        right: {
          type: "BinaryExpression",
          operator: "OR",
          left: { type: "Literal", value: false },
          right: { type: "Literal", value: true },
        },
      });
    });

    it("complex expression", () => {
      const ast = parseExpression("NOT (TRUE AND (FALSE OR TRUE))");
      expect(ast).toEqual({
        type: "UnaryExpression",
        operator: "NOT",
        argument: {
          type: "BinaryExpression",
          operator: "AND",
          left: { type: "Literal", value: true },
          right: {
            type: "BinaryExpression",
            operator: "OR",
            left: { type: "Literal", value: false },
            right: { type: "Literal", value: true },
          },
        },
      });
    });
  });

  describe("Evaluator", () => {
    const evaluateExpression = (expression: string) => {
      const tokenizer = new Tokenizer(expression);
      const tokens = tokenizer.tokenize();
      const parser = new Parser(tokens);
      const ast = parser.parse();
      return Evaluator.evaluate(ast);
    };

    it("should evaluate a simple expression", () => {
      expect(evaluateExpression("TRUE")).toBeTruthy();
      expect(evaluateExpression("FALSE")).toBeFalsy();
    });

    it("should evaluate a NOT expression", () => {
      expect(evaluateExpression("NOT TRUE")).toBeFalsy();
      expect(evaluateExpression("NOT FALSE")).toBeTruthy();
    });

    it("should evaluate a AND expression", () => {
      expect(evaluateExpression("TRUE AND TRUE")).toBeTruthy();
      expect(evaluateExpression("TRUE AND FALSE")).toBeFalsy();
      expect(evaluateExpression("FALSE AND TRUE")).toBeFalsy();
      expect(evaluateExpression("FALSE AND FALSE")).toBeFalsy();
    });

    it("should evaluate a OR expression", () => {
      expect(evaluateExpression("TRUE OR TRUE")).toBeTruthy();
      expect(evaluateExpression("TRUE OR FALSE")).toBeTruthy();
      expect(evaluateExpression("FALSE OR TRUE")).toBeTruthy();
      expect(evaluateExpression("FALSE OR FALSE")).toBeFalsy();
    });

    it("should evaluate a complex expression", () => {
      expect(evaluateExpression("NOT (TRUE AND (FALSE OR TRUE))")).toBeFalsy();
    });

    it("should throw an error for an invalid expression", () => {
      expect(() =>
        Evaluator.evaluate({
          type: "NotAValidExpression",
        })
      ).toThrowError("Invalid node type");
    });
  });
});

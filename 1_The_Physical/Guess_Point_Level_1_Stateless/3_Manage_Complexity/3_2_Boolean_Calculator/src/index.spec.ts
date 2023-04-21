import { BooleanCalculator, Evaluator } from "./index";
import { Parser, Tokenizer } from "./parser";

describe("boolean calculator", () => {
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

  describe("BooleanCalculator", () => {
    it("simple true and false values", () => {
      const calculator1 = new BooleanCalculator("TRUE");
      const calculator2 = new BooleanCalculator("FALSE");
      expect(calculator1.evaluate()).toBe(true);
      expect(calculator2.evaluate()).toBe(false);
    });

    it("basic NOT operation", () => {
      const calculator1 = new BooleanCalculator("NOT TRUE");
      const calculator2 = new BooleanCalculator("NOT FALSE");
      expect(calculator1.evaluate()).toBe(false);
      expect(calculator2.evaluate()).toBe(true);
    });

    it("basic AND operation", () => {
      const calculator = new BooleanCalculator("TRUE AND FALSE");
      expect(calculator.evaluate()).toBe(false);
    });

    it("basic OR operation", () => {
      const calculator = new BooleanCalculator("TRUE OR FALSE");
      expect(calculator.evaluate()).toBe(true);
    });

    it("nested expression", () => {
      const calculator = new BooleanCalculator("TRUE AND (FALSE OR TRUE)");
      expect(calculator.evaluate()).toBe(true);
    });

    it("complex expression", () => {
      const calculator = new BooleanCalculator(
        "NOT (TRUE AND (FALSE OR TRUE))"
      );
      expect(calculator.evaluate()).toBe(false);
    });
  });
});

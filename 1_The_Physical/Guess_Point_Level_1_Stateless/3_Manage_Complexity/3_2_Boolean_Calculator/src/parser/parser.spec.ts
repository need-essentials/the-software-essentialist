import { Parser } from "./parser";
import { Tokenizer } from "./tokenizer";

describe("Parser", () => {
  const parseExpression = (expression: string) => {
    const tokens = Tokenizer.tokenize(expression);
    return Parser.parse(tokens);
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

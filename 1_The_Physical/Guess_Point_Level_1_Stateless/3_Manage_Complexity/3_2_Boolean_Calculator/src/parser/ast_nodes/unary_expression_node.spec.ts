import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";
import { unaryExpressionNodeFactory } from "./unary_expression_node";

describe("UnaryExpressionNode", () => {
  describe("factory", () => {
    it("should return a UnaryExpressionNode", () => {
      const node = unaryExpressionNodeFactory(OPERATOR.NOT, {
        type: "Literal",
        value: true,
      } as ASTNode);
      expect(node).toEqual({
        type: "UnaryExpression",
        operator: OPERATOR.NOT,
        argument: { type: "Literal", value: true },
      });
    });
  });
});

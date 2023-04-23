import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";
import { binaryExpressionNodeFactory } from "./binary_expression_node";

describe("BinaryExpressionNode", () => {
  describe("factory", () => {
    it("should return a BinaryExpressionNode", () => {
      const node = binaryExpressionNodeFactory(
        OPERATOR.AND,
        { type: "Literal", value: true } as ASTNode,
        { type: "Literal", value: false } as ASTNode
      );
      expect(node).toEqual({
        type: "BinaryExpression",
        operator: OPERATOR.AND,
        left: { type: "Literal", value: true },
        right: { type: "Literal", value: false },
      });
    });
  });
});

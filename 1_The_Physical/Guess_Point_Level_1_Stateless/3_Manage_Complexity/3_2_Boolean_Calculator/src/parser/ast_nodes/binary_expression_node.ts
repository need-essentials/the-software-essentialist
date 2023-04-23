import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";

export interface BinaryExpressionNode extends ASTNode {
  readonly type: "BinaryExpression";
  readonly operator: OPERATOR;
  readonly left: ASTNode;
  readonly right: ASTNode;
}

export function binaryExpressionNodeFactory(
  operator: OPERATOR,
  left: ASTNode,
  right: ASTNode
): BinaryExpressionNode {
  return {
    type: "BinaryExpression",
    operator,
    left,
    right,
  };
}

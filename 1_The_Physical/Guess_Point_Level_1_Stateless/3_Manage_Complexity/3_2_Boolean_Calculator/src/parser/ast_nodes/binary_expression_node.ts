import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";

export class BinaryExpressionNode implements ASTNode {
  public readonly type = "BinaryExpression";
  public readonly operator: OPERATOR;
  public readonly left: ASTNode;
  public readonly right: ASTNode;

  constructor(operator: OPERATOR, left: ASTNode, right: ASTNode) {
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

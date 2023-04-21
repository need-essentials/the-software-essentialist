import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";

export class UnaryExpressionNode implements ASTNode {
  public readonly type = "UnaryExpression";
  public readonly operator: OPERATOR;
  public readonly argument: ASTNode;

  constructor(operator: OPERATOR, argument: ASTNode) {
    this.operator = operator;
    this.argument = argument;
  }
}

import { OPERATOR } from "../../enums";
import { ASTNode } from "./ast_node";

export interface UnaryExpressionNode extends ASTNode {
  readonly type: "UnaryExpression";
  readonly operator: OPERATOR;
  readonly argument: ASTNode;
}

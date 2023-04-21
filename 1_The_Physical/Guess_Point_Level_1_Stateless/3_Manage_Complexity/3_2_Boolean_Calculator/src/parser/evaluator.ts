import { binaryOperatorFunctions, unaryOperatorFunctions } from "../utils";
import { ASTNode } from "./ast_nodes/ast_node";
import { BinaryExpressionNode } from "./ast_nodes/binary_expression_node";
import { LiteralNode } from "./ast_nodes/literal_node";
import { UnaryExpressionNode } from "./ast_nodes/unary_expression_node";

export class Evaluator {
  private constructor() {}

  public static evaluate(node: ASTNode): boolean {
    switch (node.type) {
      case "Literal":
        return (node as LiteralNode).value;
      case "UnaryExpression":
        return this.evaluateUnaryExpression(node as UnaryExpressionNode);
      case "BinaryExpression":
        return this.evaluateBinaryExpression(node as BinaryExpressionNode);
      default:
        throw new Error("Invalid node type");
    }
  }

  private static evaluateUnaryExpression(node: UnaryExpressionNode): boolean {
    const argument = this.evaluate(node.argument);
    return unaryOperatorFunctions[node.operator](argument);
  }

  private static evaluateBinaryExpression(node: BinaryExpressionNode): boolean {
    const left = this.evaluate(node.left);
    const right = this.evaluate(node.right);
    return binaryOperatorFunctions[node.operator](left, right);
  }
}

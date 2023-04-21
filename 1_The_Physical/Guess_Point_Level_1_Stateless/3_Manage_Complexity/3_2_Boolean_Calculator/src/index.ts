import { BOOLEAN_VALUE, OPERATOR, TOKEN_SEPARATOR } from "./enums";
import { Token, Tokenizer } from "./parser";
import { ASTNode } from "./parser/ast_nodes/ast_node";
import { BinaryExpressionNode } from "./parser/ast_nodes/binary_expression_node";
import { LiteralNode } from "./parser/ast_nodes/literal_node";
import { UnaryExpressionNode } from "./parser/ast_nodes/unary_expression_node";
import {
  binaryOperatorFunctions,
  parseBooleanValue,
  unaryOperatorFunctions,
} from "./utils";

export class Parser {
  private tokens: Token[];
  private index: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): ASTNode {
    let left = this.parseUnary();

    while (this.index < this.tokens.length) {
      const operator = this.tokens[this.index];
      if (!Object.values(OPERATOR).includes(operator as OPERATOR)) break;

      this.index++;
      left = this.parseBinary(left, operator as OPERATOR);
    }

    return left;
  }

  private parseBinary(left: ASTNode, operator: OPERATOR): ASTNode {
    const right = this.parseUnary();
    return new BinaryExpressionNode(operator, left, right);
  }

  private parseUnary(): ASTNode {
    const token = this.tokens[this.index];
    if (token === OPERATOR.NOT) {
      this.index++;
      const value: ASTNode = this.parseUnary();
      return new UnaryExpressionNode(token as OPERATOR, value);
    }

    return this.parseValue();
  }

  private parseValue(): ASTNode {
    const token = this.tokens[this.index];
    if (Object.values(BOOLEAN_VALUE).includes(token as BOOLEAN_VALUE)) {
      this.index++;
      if (
        this.index < this.tokens.length &&
        Object.values(BOOLEAN_VALUE).includes(
          this.tokens[this.index] as BOOLEAN_VALUE
        )
      ) {
        throw new Error(
          "Invalid expression: Boolean value should be separated by binary operator"
        );
      }
      return new LiteralNode(parseBooleanValue(token as BOOLEAN_VALUE));
    } else if (Array.isArray(token)) {
      this.index++;
      const parser = new Parser(token);
      return parser.parse();
    }
    throw new Error("Unexpected token");
  }
}

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

export class BooleanCalculator {
  private ast: ASTNode;

  constructor(expression: string) {
    const tokens = new Tokenizer(expression).tokenize();
    this.ast = new Parser(tokens).parse();
  }

  public evaluate(): boolean {
    return Evaluator.evaluate(this.ast);
  }
}

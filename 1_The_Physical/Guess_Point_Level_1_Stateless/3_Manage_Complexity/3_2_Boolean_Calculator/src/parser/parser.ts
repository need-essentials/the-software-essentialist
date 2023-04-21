import { BOOLEAN_VALUE, OPERATOR } from "../enums";
import { parseBooleanValue } from "../utils";
import { ASTNode } from "./ast_nodes/ast_node";
import { BinaryExpressionNode } from "./ast_nodes/binary_expression_node";
import { LiteralNode } from "./ast_nodes/literal_node";
import { UnaryExpressionNode } from "./ast_nodes/unary_expression_node";
import { Token } from "./tokenizer";

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

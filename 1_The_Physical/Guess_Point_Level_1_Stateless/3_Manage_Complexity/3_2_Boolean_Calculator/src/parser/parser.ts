import { BOOLEAN_VALUE, OPERATOR } from "../enums";
import { parseBooleanValue } from "../utils";
import { ASTNode } from "./ast_nodes/ast_node";
import { binaryExpressionNodeFactory } from "./ast_nodes/binary_expression_node";
import { LiteralNode } from "./ast_nodes/literal_node";
import { UnaryExpressionNode } from "./ast_nodes/unary_expression_node";
import { Token } from "./tokenizer";

export class Parser {
  private constructor() {}

  public static parse(tokens: Token[]): ASTNode {
    return Parser.parseExpression(tokens, 0).node;
  }

  private static parseExpression(
    tokens: Token[],
    index: number
  ): { node: ASTNode; newIndex: number } {
    let { node: left, newIndex: currentIndex } = Parser.parseUnary(
      tokens,
      index
    );

    while (currentIndex < tokens.length) {
      const operator = tokens[currentIndex];
      if (!Object.values(OPERATOR).includes(operator as OPERATOR)) break;

      currentIndex++;
      ({ node: left, newIndex: currentIndex } = Parser.parseBinary(
        tokens,
        currentIndex,
        left,
        operator as OPERATOR
      ));
    }

    return { node: left, newIndex: currentIndex };
  }

  private static parseBinary(
    tokens: Token[],
    index: number,
    left: ASTNode,
    operator: OPERATOR
  ): { node: ASTNode; newIndex: number } {
    const { node: right, newIndex } = Parser.parseUnary(tokens, index);
    return {
      node: binaryExpressionNodeFactory(operator, left, right),
      newIndex,
    };
  }

  private static parseUnary(
    tokens: Token[],
    index: number
  ): { node: ASTNode; newIndex: number } {
    const token = tokens[index];
    if (token === OPERATOR.NOT) {
      const { node: value, newIndex } = Parser.parseUnary(tokens, index + 1);
      return {
        node: new UnaryExpressionNode(token as OPERATOR, value),
        newIndex,
      };
    }

    return Parser.parseValue(tokens, index);
  }

  private static parseValue(
    tokens: Token[],
    index: number
  ): { node: ASTNode; newIndex: number } {
    const token = tokens[index];
    if (Object.values(BOOLEAN_VALUE).includes(token as BOOLEAN_VALUE)) {
      index++;
      if (
        index < tokens.length &&
        Object.values(BOOLEAN_VALUE).includes(tokens[index] as BOOLEAN_VALUE)
      ) {
        throw new Error(
          "Invalid expression: Boolean value should be separated by binary operator"
        );
      }
      return {
        node: new LiteralNode(parseBooleanValue(token as BOOLEAN_VALUE)),
        newIndex: index,
      };
    } else if (Array.isArray(token)) {
      index++;
      const node = Parser.parse(token);
      return { node, newIndex: index };
    }
    throw new Error("Unexpected token");
  }
}

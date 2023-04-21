enum BOOLEAN_VALUE {
  TRUE = "TRUE",
  FALSE = "FALSE",
}

enum OPERATOR {
  NOT = "NOT",
  AND = "AND",
  OR = "OR",
}

enum TOKEN_SEPARATOR {
  SPACE = " ",
  OPEN_PARENTHESIS = "(",
  CLOSE_PARENTHESIS = ")",
}

export const parseBooleanValue = (value: string): boolean => {
  switch (value.toUpperCase()) {
    case BOOLEAN_VALUE.TRUE:
      return true;
    case BOOLEAN_VALUE.FALSE:
      return false;
    default:
      throw new Error("Invalid boolean value");
  }
};

type UnaryOperatorFunction = (value: boolean) => boolean;
type BinaryOperatorFunction = (left: boolean, right: boolean) => boolean;

export const unaryOperatorFunctions: Record<string, UnaryOperatorFunction> = {
  [OPERATOR.NOT]: (value) => !value,
};

export const binaryOperatorFunctions: Record<string, BinaryOperatorFunction> = {
  [OPERATOR.AND]: (left, right) => left && right,
  [OPERATOR.OR]: (left, right) => left || right,
};

type Token = string | Token[];

export class Tokenizer {
  private index: number = 0;
  private expression: string;

  constructor(expression: string) {
    this.expression = expression;
  }

  public tokenize(): Token[] {
    let tokens: Token[] = [];
    while (this.index < this.expression.length) {
      const char = this.expression[this.index];
      if (char === TOKEN_SEPARATOR.SPACE) {
        this.index++;
      } else if (char === TOKEN_SEPARATOR.OPEN_PARENTHESIS) {
        this.index++;
        const nestedTokens = this.tokenize();
        tokens.push(nestedTokens);
      } else if (char === TOKEN_SEPARATOR.CLOSE_PARENTHESIS) {
        this.index++;
        return tokens;
      } else {
        tokens.push(this.readToken());
      }
    }

    console.log(tokens);
    return tokens;
  }

  private readToken(): string {
    let token = "";
    while (this.index < this.expression.length) {
      const char = this.expression[this.index];
      if (Object.values(TOKEN_SEPARATOR).includes(char as TOKEN_SEPARATOR))
        break;
      token += char;
      this.index++;
    }
    return token;
  }
}

interface ASTNode {
  type: string;
}

class LiteralNode implements ASTNode {
  public readonly type = "Literal";
  public readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }
}

class UnaryExpressionNode implements ASTNode {
  public readonly type = "UnaryExpression";
  public readonly operator: OPERATOR;
  public readonly argument: ASTNode;

  constructor(operator: OPERATOR, argument: ASTNode) {
    this.operator = operator;
    this.argument = argument;
  }
}

class BinaryExpressionNode implements ASTNode {
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

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

export class Tokenizer {
  private index: number = 0;
  private expression: string;

  constructor(expression: string) {
    this.expression = expression;
  }

  public tokenize(): any[] {
    let tokens: any[] = [];
    while (this.index < this.expression.length) {
      const char = this.expression[this.index];
      if (char === TOKEN_SEPARATOR.SPACE) {
        this.index++;
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
      if (char === TOKEN_SEPARATOR.SPACE) {
        break;
      }
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

export class Parser {
  private tokens: string[];
  private index: number = 0;

  constructor(tokens: string[]) {
    this.tokens = tokens;
  }

  public parse(): ASTNode {
    return this.parseUnary();
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

  private parseValue(): LiteralNode {
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
      return new LiteralNode(parseBooleanValue(token));
    }
    throw new Error("Unexpected token");
  }
}

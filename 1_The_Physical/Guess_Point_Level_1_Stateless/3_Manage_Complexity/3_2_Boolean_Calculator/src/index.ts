const BOOLEAN_VALUE = {
  TRUE: "TRUE",
  FALSE: "FALSE",
};

const OPERATOR = {
  NOT: "NOT",
  AND: "AND",
  OR: "OR",
};

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

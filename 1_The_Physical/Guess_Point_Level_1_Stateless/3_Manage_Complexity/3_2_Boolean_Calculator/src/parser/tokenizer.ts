import { TOKEN_SEPARATOR } from "../enums";

export type Token = string | Token[];

export class Tokenizer {
  private constructor() {}

  public static tokenize(expression: string): Token[] {
    return Tokenizer.tokenizeExpression(expression.toUpperCase(), 0).tokens;
  }

  private static tokenizeExpression(
    expression: string,
    index: number
  ): { tokens: Token[]; newIndex: number } {
    let tokens: Token[] = [];
    while (index < expression.length) {
      const char = expression[index];
      if (char === TOKEN_SEPARATOR.SPACE) {
        index++;
      } else if (char === TOKEN_SEPARATOR.OPEN_PARENTHESIS) {
        index++;
        const { tokens: nestedTokens, newIndex } = Tokenizer.tokenizeExpression(
          expression,
          index
        );
        tokens.push(nestedTokens);
        index = newIndex;
      } else if (char === TOKEN_SEPARATOR.CLOSE_PARENTHESIS) {
        index++;
        return { tokens, newIndex: index };
      } else {
        const { token, newIndex } = Tokenizer.readToken(expression, index);
        tokens.push(token);
        index = newIndex;
      }
    }

    return { tokens, newIndex: index };
  }

  private static readToken(
    expression: string,
    index: number
  ): { token: string; newIndex: number } {
    let token = "";
    while (index < expression.length) {
      const char = expression[index];
      if (Object.values(TOKEN_SEPARATOR).includes(char as TOKEN_SEPARATOR))
        break;
      token += char;
      index++;
    }
    return { token, newIndex: index };
  }
}

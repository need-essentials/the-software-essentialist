import { TOKEN_SEPARATOR } from "../enums";

export type Token = string | Token[];

export class Tokenizer {
  private index: number = 0;
  private expression: string;

  constructor(expression: string) {
    this.expression = expression.toUpperCase();
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

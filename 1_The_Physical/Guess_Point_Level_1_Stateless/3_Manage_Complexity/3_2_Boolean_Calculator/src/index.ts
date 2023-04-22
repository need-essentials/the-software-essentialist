import { Evaluator, Parser, Tokenizer } from "./parser";

export class BooleanCalculator {
  private constructor() {}

  public static evaluate(expression: string): boolean {
    const tokens = Tokenizer.tokenize(expression);
    const ast = new Parser(tokens).parse();
    return Evaluator.evaluate(ast);
  }
}

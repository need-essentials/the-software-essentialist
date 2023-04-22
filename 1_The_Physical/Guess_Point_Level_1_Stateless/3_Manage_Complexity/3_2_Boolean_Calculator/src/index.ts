import { Evaluator, Parser, Tokenizer } from "./parser";

export class BooleanCalculator {
  private constructor() {}

  public static evaluate(expression: string): boolean {
    const tokens = Tokenizer.tokenize(expression);
    const ast = Parser.parse(tokens);
    return Evaluator.evaluate(ast);
  }
}

import { Evaluator, Parser, Tokenizer } from "./parser";

export class BooleanCalculator {
  private constructor() {}

  public static evaluate(expression: string): boolean {
    const tokens = new Tokenizer(expression).tokenize();
    const ast = new Parser(tokens).parse();
    return Evaluator.evaluate(ast);
  }
}

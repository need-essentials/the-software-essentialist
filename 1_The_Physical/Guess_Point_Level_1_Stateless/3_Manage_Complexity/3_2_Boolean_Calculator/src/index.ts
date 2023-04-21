import { ASTNode, Evaluator, Parser, Tokenizer } from "./parser";

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

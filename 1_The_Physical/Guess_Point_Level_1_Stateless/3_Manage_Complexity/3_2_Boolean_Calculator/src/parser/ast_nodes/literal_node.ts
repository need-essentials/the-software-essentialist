import { ASTNode } from "./ast_node";

export class LiteralNode implements ASTNode {
  public readonly type = "Literal";
  public readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }
}

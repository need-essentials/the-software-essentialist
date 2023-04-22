import { Tokenizer } from "./tokenizer";

describe("Tokenizer", () => {
  it("should tokenize a simple expression without parentheses", () => {
    const expression = "TRUE AND FALSE";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual(["TRUE", "AND", "FALSE"]);
  });

  it("should tokenize a simple expression with NOT operator", () => {
    const expression = "NOT TRUE";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual(["NOT", "TRUE"]);
  });

  it("should tokenize an expression with nested parentheses", () => {
    const expression = "TRUE AND (FALSE OR TRUE)";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual(["TRUE", "AND", ["FALSE", "OR", "TRUE"]]);
  });

  it("should tokenize an expression with multiple levels of nesting", () => {
    const expression = "NOT (TRUE AND (FALSE OR (TRUE AND FALSE)))";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual([
      "NOT",
      ["TRUE", "AND", ["FALSE", "OR", ["TRUE", "AND", "FALSE"]]],
    ]);
  });

  it("should handle extra spaces between tokens", () => {
    const expression = "  TRUE  AND  (  FALSE  OR  TRUE  )  ";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual(["TRUE", "AND", ["FALSE", "OR", "TRUE"]]);
  });

  it("should return an empty array for an empty expression", () => {
    const expression = "";
    const tokens = Tokenizer.tokenize(expression);

    expect(tokens).toEqual([]);
  });
});

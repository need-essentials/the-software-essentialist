import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("simple true and false values", () => {
    expect(BooleanCalculator.evaluate("TRUE")).toBe(true);
    expect(BooleanCalculator.evaluate("FALSE")).toBe(false);
  });

  it("basic NOT operation", () => {
    expect(BooleanCalculator.evaluate("NOT TRUE")).toBe(false);
    expect(BooleanCalculator.evaluate("NOT FALSE")).toBe(true);
  });

  it("basic AND operation", () => {
    expect(BooleanCalculator.evaluate("TRUE AND FALSE")).toBe(false);
  });

  it("basic OR operation", () => {
    expect(BooleanCalculator.evaluate("TRUE OR FALSE")).toBe(true);
  });

  it("nested expression", () => {
    expect(BooleanCalculator.evaluate("TRUE AND (FALSE OR TRUE)")).toBe(true);
  });

  it("complex expression", () => {
    expect(BooleanCalculator.evaluate("NOT (TRUE AND (FALSE OR TRUE))")).toBe(
      false
    );
  });
});

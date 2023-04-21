import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("simple true and false values", () => {
    const calculator1 = new BooleanCalculator("TRUE");
    const calculator2 = new BooleanCalculator("FALSE");
    expect(calculator1.evaluate()).toBe(true);
    expect(calculator2.evaluate()).toBe(false);
  });

  it("basic NOT operation", () => {
    const calculator1 = new BooleanCalculator("NOT TRUE");
    const calculator2 = new BooleanCalculator("NOT FALSE");
    expect(calculator1.evaluate()).toBe(false);
    expect(calculator2.evaluate()).toBe(true);
  });

  it("basic AND operation", () => {
    const calculator = new BooleanCalculator("TRUE AND FALSE");
    expect(calculator.evaluate()).toBe(false);
  });

  it("basic OR operation", () => {
    const calculator = new BooleanCalculator("TRUE OR FALSE");
    expect(calculator.evaluate()).toBe(true);
  });

  it("nested expression", () => {
    const calculator = new BooleanCalculator("TRUE AND (FALSE OR TRUE)");
    expect(calculator.evaluate()).toBe(true);
  });

  it("complex expression", () => {
    const calculator = new BooleanCalculator("NOT (TRUE AND (FALSE OR TRUE))");
    expect(calculator.evaluate()).toBe(false);
  });
});

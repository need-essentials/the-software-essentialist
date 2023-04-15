import { fizzbuzz, isMultipleOf } from "./fizzbuzz";

describe("fizzbuzz", () => {
  test("returns Fizz for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(6)).toBe("Fizz");
  });

  test("returns Buzz for multiples of 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(10)).toBe("Buzz");
  });

  test("returns FizzBuzz for multiples of 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
    expect(fizzbuzz(30)).toBe("FizzBuzz");
  });

  test("returns the number as a string for non-multiples of 3 or 5", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(2)).toBe("2");
    expect(fizzbuzz(4)).toBe("4");
  });

  test("throws an error for out of range numbers", () => {
    expect(() => fizzbuzz(0)).toThrow();
    expect(() => fizzbuzz(101)).toThrow();
  });

  describe("isMultipleOf", () => {
    test("returns true for multiples of 3", () => {
      expect(isMultipleOf(3, 3)).toBe(true);
      expect(isMultipleOf(6, 3)).toBe(true);
    });

    test("returns true for multiples of 5", () => {
      expect(isMultipleOf(5, 5)).toBe(true);
      expect(isMultipleOf(10, 5)).toBe(true);
    });
  });
});

import {
  assertInRange,
  convertNumberToFizzBuzz,
  isInRange,
  isMultipleOf,
} from "./fizzbuzz";

describe("fizzbuzz", () => {
  describe("convertNumberToFizzBuzz", () => {
    test("returns Fizz for multiples of 3", () => {
      expect(convertNumberToFizzBuzz(3)).toBe("Fizz");
      expect(convertNumberToFizzBuzz(6)).toBe("Fizz");
    });

    test("returns Buzz for multiples of 5", () => {
      expect(convertNumberToFizzBuzz(5)).toBe("Buzz");
      expect(convertNumberToFizzBuzz(10)).toBe("Buzz");
    });

    test("returns FizzBuzz for multiples of 3 and 5", () => {
      expect(convertNumberToFizzBuzz(15)).toBe("FizzBuzz");
      expect(convertNumberToFizzBuzz(30)).toBe("FizzBuzz");
    });

    test("returns the number as a string for non-multiples of 3 or 5", () => {
      expect(convertNumberToFizzBuzz(1)).toBe("1");
      expect(convertNumberToFizzBuzz(2)).toBe("2");
      expect(convertNumberToFizzBuzz(4)).toBe("4");
    });

    test("throws an error for out of range numbers", () => {
      expect(() => convertNumberToFizzBuzz(0)).toThrow();
      expect(() => convertNumberToFizzBuzz(101)).toThrow();
    });
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

  describe("isInRange", () => {
    test("returns true for numbers between 1 and 100", () => {
      expect(isInRange(1)).toBe(true);
      expect(isInRange(50)).toBe(true);
      expect(isInRange(100)).toBe(true);
    });

    test("returns false for numbers outside the range", () => {
      expect(isInRange(0)).toBe(false);
      expect(isInRange(101)).toBe(false);
    });
  });

  describe("assertInRange", () => {
    test("throws an error for numbers outside the range", () => {
      expect(() => assertInRange(0)).toThrow();
      expect(() => assertInRange(101)).toThrow();
    });

    test("does not throw an error for numbers inside the range", () => {
      expect(() => assertInRange(1)).not.toThrow();
      expect(() => assertInRange(50)).not.toThrow();
      expect(() => assertInRange(100)).not.toThrow();
    });
  });
});

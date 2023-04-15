import { fizzbuzz } from "./fizzbuzz";

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
});

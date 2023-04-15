export const isInRange = (n: number, min = 1, max = 100) =>
  n >= min && n <= max;

export const assertInRange = (n: number, min = 1, max = 100) => {
  if (!isInRange(n, min, max)) throw new Error("Out of range");
};

export const isMultipleOf = (n: number, factor: number) => n % factor === 0;

export function convertNumberToFizzBuzz(n: number): string {
  assertInRange(n);

  if (isMultipleOf(n, 3) && isMultipleOf(n, 5)) return "FizzBuzz";
  if (isMultipleOf(n, 3)) return "Fizz";
  if (isMultipleOf(n, 5)) return "Buzz";

  return n.toString();
}

export function fizzbuzz(numbers: number[]): string {
  throw new Error("Not implemented");
}

export const isInRange = (n: number, min = 1, max = 100) => {
  throw new Error("Not implemented");
};

export const isMultipleOf = (n: number, factor: number) => n % factor === 0;

export function fizzbuzz(n: number): string {
  if (n < 1 || n > 100) throw new Error("Out of range");

  if (isMultipleOf(n, 3) && isMultipleOf(n, 5)) return "FizzBuzz";
  if (isMultipleOf(n, 3)) return "Fizz";
  if (isMultipleOf(n, 5)) return "Buzz";

  return n.toString();
}

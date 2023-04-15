export const isMultipleOf = (n: number, m: number) => {
  throw new Error("Not implemented");
};

export function fizzbuzz(n: number): string {
  if (n < 1 || n > 100) throw new Error("Out of range");

  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";

  return n.toString();
}

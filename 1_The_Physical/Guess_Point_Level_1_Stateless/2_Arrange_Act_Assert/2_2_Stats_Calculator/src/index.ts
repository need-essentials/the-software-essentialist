export const statsCalculator = (
  numbers: number[]
): {
  sum: number;
  numberOfElements: number;
} => {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return { sum, numberOfElements: numbers.length };
};

export const statsCalculator = (
  numbers: number[]
): {
  sum: number;
} => {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return { sum };
};

export const statsCalculator = (
  numbers: number[]
): {
  sum: number;
  numberOfElements: number;
  min: number;
} => {
  const { sum, min } = numbers.reduce(
    (acc, number) => {
      return {
        sum: acc.sum + number,
        min: acc.min > number ? number : acc.min,
      };
    },
    { sum: 0, min: Infinity }
  );

  return { sum, numberOfElements: numbers.length, min };
};

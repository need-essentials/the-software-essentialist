export type Stats = {
  sum: number;
  numberOfElements: number;
  min: number;
  max: number;
};

export const statsCalculator = (numbers: number[]): Stats => {
  const { sum, min, max } = numbers.reduce(
    (acc, number) => {
      return {
        sum: acc.sum + number,
        min: acc.min > number ? number : acc.min,
        max: acc.max < number ? number : acc.max,
      };
    },
    { sum: 0, min: Infinity, max: -Infinity }
  );

  return { sum, numberOfElements: numbers.length, min, max };
};

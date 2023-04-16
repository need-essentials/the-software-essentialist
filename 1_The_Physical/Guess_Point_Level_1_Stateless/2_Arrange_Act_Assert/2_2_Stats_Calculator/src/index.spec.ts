import { statsCalculator } from "./index";

describe("stats calculator", () => {
  it("should calculate the sum of the numbers", () => {
    const useCases = [
      {
        numbers: [1, 2, 3],
        expected: 6,
      },
      {
        numbers: [1, 2, 3, 4, 5],
        expected: 15,
      },
    ];

    useCases.forEach(({ numbers, expected }) => {
      const actual = statsCalculator(numbers).sum;
      expect(actual).toEqual(expected);
    });
  });

  it("should calculate the number of elements", () => {
    const useCases = [
      {
        numbers: [1, 2, 3],
        expected: 3,
      },
      {
        numbers: [1, 2, 3, 4, 5],
        expected: 5,
      },
    ];

    useCases.forEach(({ numbers, expected }) => {
      const actual = statsCalculator(numbers).numberOfElements;
      expect(actual).toEqual(expected);
    });
  });

  it("should calculate the minimum number", () => {
    const useCases = [
      {
        numbers: [1, 2, 3],
        expected: 1,
      },
      {
        numbers: [100, 2, 3, 4, 5],
        expected: 2,
      },
    ];

    useCases.forEach(({ numbers, expected }) => {
      const actual = statsCalculator(numbers).min;
      expect(actual).toEqual(expected);
    });
  });
});

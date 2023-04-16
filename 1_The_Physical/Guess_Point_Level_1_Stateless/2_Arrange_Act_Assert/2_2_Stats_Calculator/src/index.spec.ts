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
});

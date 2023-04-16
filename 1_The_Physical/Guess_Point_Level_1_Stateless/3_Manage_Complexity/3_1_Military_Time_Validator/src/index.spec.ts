import { isInRange } from "./index";

describe("military time validator", () => {
  describe("isInRange", () => {
    it("should return true if value is in range", () => {
      expect(isInRange(5, 0, 10)).toBe(true);
    });

    it("should return false if value is not in range", () => {
      expect(isInRange(5, 6, 10)).toBe(false);
    });
  });
});

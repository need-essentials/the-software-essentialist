import {
  isHourInRange,
  isInRange,
  isMinuteInRange,
  isValidTime,
} from "./index";

describe("military time validator", () => {
  describe("isInRange", () => {
    it("should return true if value is in range", () => {
      expect(isInRange(5, 0, 10)).toBe(true);
    });

    it("should return false if value is not in range", () => {
      expect(isInRange(5, 6, 10)).toBe(false);
    });
  });

  describe("isHourInRange", () => {
    it("should return true if hour is in range", () => {
      expect(isHourInRange(5)).toBe(true);
    });

    it("should return false if hour is not in range", () => {
      expect(isHourInRange(25)).toBe(false);
    });
  });

  describe("isMinuteInRange", () => {
    it("should return true if minute is in range", () => {
      expect(isMinuteInRange(5)).toBe(true);
    });

    it("should return false if minute is not in range", () => {
      expect(isMinuteInRange(61)).toBe(false);
    });
  });

  describe("isValidTime", () => {
    it("should return true if time is valid", () => {
      expect(isValidTime("12:00")).toBe(true);
    });

    it("should return false if time is invalid", () => {
      expect(isValidTime("25:00")).toBe(false);
    });
  });
});

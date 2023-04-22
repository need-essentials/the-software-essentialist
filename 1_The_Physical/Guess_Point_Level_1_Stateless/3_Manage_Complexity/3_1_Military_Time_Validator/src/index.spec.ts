import { isMilitaryTime } from "./index";

describe("military time validator", () => {
  it("should return true if time range is valid", () => {
    expect(isMilitaryTime("01:12 - 14:32")).toBeTruthy();
    expect(isMilitaryTime("22:00 - 23:12")).toBeTruthy();
  });

  it("should return false if time range is invalid", () => {
    expect(isMilitaryTime("25:00 - 12:23")).toBeFalsy();
    expect(isMilitaryTime("12:76 - 21:00")).toBeFalsy();
  });

  it("should return false if time range is not in military format", () => {
    expect(isMilitaryTime("01:12 PM - 02:12 PM")).toBeFalsy();
    expect(isMilitaryTime("AA:AA - BB:BB")).toBeFalsy();
    expect(isMilitaryTime("12:00")).toBeFalsy();
  });
});

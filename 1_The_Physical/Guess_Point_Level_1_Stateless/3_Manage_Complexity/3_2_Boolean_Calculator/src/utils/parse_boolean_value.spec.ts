import { parseBooleanValue } from "./parse_boolean_value";

describe("parseBooleanValue", () => {
  it("should return true for 'true'", () => {
    expect(parseBooleanValue("true")).toBeTruthy();
  });

  it("should return false for 'false'", () => {
    expect(parseBooleanValue("false")).toBeFalsy();
  });

  it("should throw an error for 'foo'", () => {
    expect(() => parseBooleanValue("foo")).toThrowError(
      "Invalid boolean value"
    );
  });
});

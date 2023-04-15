import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  test("should return true for empty string", () => {
    expect(isPalindrome("")).toBeTruthy();
  });
});

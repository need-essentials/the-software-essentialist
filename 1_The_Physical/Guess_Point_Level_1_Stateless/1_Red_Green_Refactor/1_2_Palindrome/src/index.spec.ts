import { isPalindrome, normalize } from "./index";

describe("palindrome checker", () => {
  test("should return true for empty string", () => {
    expect(isPalindrome("")).toBeTruthy();
  });

  test("should return true for palindrome", () => {
    expect(isPalindrome("a")).toBeTruthy();
    expect(isPalindrome("Mom")).toBeTruthy();
    expect(isPalindrome("Was It A Rat I Saw")).toBeTruthy();
    expect(isPalindrome("Never Odd or Even")).toBeTruthy();
  });

  test("should return false for non-palindrome", () => {
    expect(isPalindrome("bill")).toBeFalsy();
    expect(isPalindrome("hello")).toBeFalsy();
  });

  describe("normalize", () => {
    test("should remove spaces", () => {
      expect(normalize("a b")).toBe("ab");
    });

    test("should remove punctuation", () => {
      expect(normalize("a, b!")).toBe("ab");
    });

    test("should lowercase", () => {
      expect(normalize("A")).toBe("a");
    });
  });
});

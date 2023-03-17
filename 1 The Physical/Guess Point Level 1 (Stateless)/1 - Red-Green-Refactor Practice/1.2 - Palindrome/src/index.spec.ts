import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  it("should return true for a palindrome", () => {
    expect(isPalindrome("wow")).toBeTruthy();
  });

  it("should return false for a non-palindrome", () => {
    expect(isPalindrome("hello")).toBeFalsy();
  });

  it("should return true for a palindrome with spaces", () => {
    const palindromes = ["Was It A Rat I Saw", "Never Odd or Even"];

    palindromes.forEach((palindrome) => {
      expect(isPalindrome(palindrome)).toBeTruthy();
    });
  });

  it("should return false for a non-palindrome with spaces", () => {
    const nonPalindromes = ["Hello World", "Just don't do it"];

    nonPalindromes.forEach((nonPalindrome) => {
      expect(isPalindrome(nonPalindrome)).toBeFalsy();
    });
  });
});

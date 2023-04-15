import { isPalindrome, normalize } from "./index";

describe("palindrome checker", () => {
  test("should return true for empty string", () => {
    expect(isPalindrome("")).toBeTruthy();
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

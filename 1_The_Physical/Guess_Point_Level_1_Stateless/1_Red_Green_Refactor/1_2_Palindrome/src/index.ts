export function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z]/g, "");
}

export function isPalindrome(str: string): boolean {
  const normalizedStr = normalize(str);

  if (normalizedStr.length === 0) {
    return true;
  }

  return false;
}

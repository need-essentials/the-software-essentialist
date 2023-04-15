export function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z]/g, "");
}

export function isPalindrome(str: string): boolean {
  const normalizedStr = normalize(str);

  let left = 0;
  let right = normalizedStr.length - 1;

  while (left < right) {
    if (normalizedStr[left] !== normalizedStr[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

export function isPalindrome(str: string): boolean {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleanedStr.length - 1;

  while (left < right) {
    if (cleanedStr[left] !== cleanedStr[right]) return false;
    left++;
    right--;
  }

  return true;
}

export const isNameIncludingText = (
  name: string,
  textToCheck: string
): boolean => name.toLowerCase().includes(textToCheck.toLowerCase());

export const isNameMatchingText = (
  name: string,
  textToCheck: string
): boolean => name.toLowerCase() === textToCheck.toLowerCase();

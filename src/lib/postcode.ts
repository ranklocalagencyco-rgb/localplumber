// src/lib/postcode.ts
// UK postcode parsing utilities.

const UK_POSTCODE_REGEX = /^([A-Z]{1,2}[0-9][0-9A-Z]?)\s?[0-9][A-Z]{2}$/i;

export function validateUKPostcode(postcode: string): boolean {
  return UK_POSTCODE_REGEX.test(postcode.trim());
}

export function parseOutcode(postcode: string): string | null {
  const match = postcode.trim().toUpperCase().match(UK_POSTCODE_REGEX);
  if (!match) return null;
  return match[1];
}

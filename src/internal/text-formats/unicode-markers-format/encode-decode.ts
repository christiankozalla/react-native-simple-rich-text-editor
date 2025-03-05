/**
 * The encode function leverages a concept from the Unicode spec - Variant Selectors - which enables arbitrary bytes to be appended invisibly to a unicode char.
 * @param base string, usually a single char, to which bytes are appended. These bytes remain invisible when base is rendered
 * @param bytes to added to the base string/char.
 * @returns string
 */
function encode(base: string, bytes: Uint8Array): string {
  let result = base;
  for (const byte of bytes) {
    result += byteToVariationSelector(byte);
  }
  return result;
}

/**
 * The decode function extracts data hidden inside a string masquerading as variation selectors.
 * @param variationSelectors string that may contain bytes hidden as variation selectors
 * @returns a list of numbers/bytes
 */
function decode(variationSelectors: string): number[] {
  const result: number[] = [];
  let started = false;

  for (const char of variationSelectors) {
    const byte = variationSelectorToByte(char);
    if (byte !== null) {
      result.push(byte);
      started = true;
    } else if (started) {
      break;
    }
  }

  return result;
}

// Utility function to transform a byte into a variation selector, for appending it to a unicode char.
function byteToVariationSelector(byte: number): string {
  if (byte < 16) {
    return String.fromCodePoint(0xfe00 + byte);
  } else {
    return String.fromCodePoint(0xe0100 + (byte - 16));
  }
}

// Utility function to extract hidden data from a unicode char's variation selectors.
function variationSelectorToByte(variationSelector: string): number | null {
  const codePoint = variationSelector.codePointAt(0);
  if (codePoint === undefined) return null;
  if (codePoint >= 0xfe00 && codePoint <= 0xfe0f) {
    return codePoint - 0xfe00;
  } else if (codePoint >= 0xe0100 && codePoint <= 0xe01ef) {
    return codePoint - 0xe0100 + 16;
  } else {
    return null;
  }
}

// Source of encode, decode and variation selector utilities is https://paulbutler.org/2025/smuggling-arbitrary-data-through-an-emoji/ originally written in Rust
export { encode, decode };

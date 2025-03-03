// add the separator after each element of arr, except for the last element
function intersperse<T>(arr: T[], separator: T | string): (T | string)[] {
  if (arr.length === 0) return [];

  const output = new Array(arr.length * 2 - 1);
  for (let i = 0, j = 0; i < arr.length; i++, j += 2) {
    output[j] = arr[i];
    if (j + 1 < output.length) {
      output[j + 1] = separator;
    }
  }
  return output;
}

export { intersperse };

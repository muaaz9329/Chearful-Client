export function processString(input: string, limit: number): string[] {
  const array = input.split(',');
  return processArray(array, limit);
}

export function processArray(array: string[], limit: number): string[] {
  let tempArray;
  if (array.length > limit) {
    tempArray = array.slice(0, limit);
    tempArray.push('+' + (array.length - limit));
  } else {
    tempArray = array;
  }

  return tempArray;
}

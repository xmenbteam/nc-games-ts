export const pageOffsetCalc = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export const checkIfValid = (string: string, array: string[]): boolean =>
  array.includes(string);

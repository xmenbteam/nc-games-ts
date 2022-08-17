export default class UtilFunctions {
  static pageOffsetCalc = (page: number, limit: number): number => {
    return (page - 1) * limit;
  };

  static checkIfValid = (string: string, array: string[]): boolean =>
    array.includes(string);
}

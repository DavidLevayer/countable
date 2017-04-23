export class NumberUtils {

  /**
   * Rounds given number with at most 2 decimal digits.
   * @param toRound
   * @returns {number}
   */
  static round(toRound: number) {
    return Math.round((toRound + 0.001) * 100) / 100;
  }
}

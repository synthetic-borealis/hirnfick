export default class BracketMismatchError extends Error {
  /**
   * BracketMismatch Error constructor.
   */
  constructor() {
    super('Mismatching brackets detected');
  }
}

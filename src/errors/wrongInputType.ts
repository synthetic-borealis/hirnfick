export default class WrongInputTypeError extends Error {
  /**
   * WrongInputType Error constructor.
   * @param {string} message
   */
  constructor(message: string) {
    super(`Wrong input type:${message}`);
  }
}

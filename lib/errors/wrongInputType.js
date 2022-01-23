class WrongInputTypeError extends Error {
  /**
   * WrongInputType Error constructor.
   * @param {string} message
   */
  constructor(message) {
    super(`Wrong input type:${message ? ` ${message}` : ''}`);
  }
}

module.exports = WrongInputTypeError;

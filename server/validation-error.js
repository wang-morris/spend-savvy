const ClientError = require('./client-error');

class ValidationError extends ClientError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = ValidationError;

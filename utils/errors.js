// errors.js

class CustomError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
      this.errorCode = errorCode || 'INTERNAL_ERROR';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ValidationError extends CustomError {
    constructor(message, errorCode = 'VALIDATION_ERROR') {
      super(message, 400, errorCode);
    }
  }
  
  class AuthenticationError extends CustomError {
    constructor(message, errorCode = 'AUTHENTICATION_ERROR') {
      super(message, 401, errorCode);
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message, errorCode = 'NOT_FOUND') {
      super(message, 404, errorCode);
    }
  }
  
  class DatabaseError extends CustomError {
    constructor(message, errorCode = 'DATABASE_ERROR') {
      super(message, 500, errorCode);
    }
  }
  
  // Add more custom error types as needed
  
  module.exports = {
    CustomError,
    ValidationError,
    AuthenticationError,
    NotFoundError,
    DatabaseError,
  };
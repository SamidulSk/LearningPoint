
class AppError extends Error { // AppError.js
    constructor(message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
module.exports = class Util {
  constructor() {
    this.statusCode = null;
    this.success = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }

  send(res) {
    const result = {
      success: this.success,
      message: this.message,
      data: this.data,
    };

    if (this.success) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
    });
  }
};

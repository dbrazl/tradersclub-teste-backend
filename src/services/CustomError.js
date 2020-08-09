function CustomError(errors = []) {
  this.errors = errors;
  this.stack = new Error().stack;
}
CustomError.prototype = Object.create(CustomError.prototype);
CustomError.prototype.constructor = CustomError;

export default CustomError;

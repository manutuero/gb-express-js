const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'externalApiError';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.NOT_FOUND_ERROR = 'Not Found';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

exports.VALIDATION_ERROR = 'Field validations failed.';
exports.fieldValidationsFailed = message => internalError(message, exports.VALIDATION_ERROR);

exports.BAD_REQUEST = 'Bad request.';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.EMAIL_REGISTERED_ERROR = 'Email already exists on database';
exports.emailRegisteredError = message => internalError(message, exports.EMAIL_REGISTERED_ERROR);

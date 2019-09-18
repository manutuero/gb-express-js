exports.serializeParamError = error => ({
  message: error.msg,
  param: error.param
});

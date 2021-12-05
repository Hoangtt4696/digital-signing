export default (err, req, res, next) => {
  const error = err || {};
  const code = error.status || 500;
  const response = {
    code: code,
    success: false,
    message: error.message || 'System error, please try again !',
    data: null,
  };

  res.status(code).json(response);
};

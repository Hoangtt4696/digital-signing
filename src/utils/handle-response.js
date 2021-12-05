export default (status, success, data, error) => {
  const response = {
    code: status || 200,
    success,
    message: error ? error.message : null,
    data: data || null,
  };

  return response;
};

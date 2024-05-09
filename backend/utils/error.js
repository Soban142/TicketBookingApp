export const createError = (status, errorMessage) => {
  const error = new Error();
  error.status = status;
  error.message = errorMessage;
  return error;
};

// @ts-nocheck
const errorResponerHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const invalidPathHandler = (req, res, next) => {
  const error = Error("Invalid Path");
  error.statusCode = 404;
  next(error);
};

export { errorResponerHandler, invalidPathHandler };

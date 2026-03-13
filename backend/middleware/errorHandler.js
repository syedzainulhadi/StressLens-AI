// backend/middleware/errorHandler.js
// Global error-handling middleware — must be registered LAST in Express.

function errorHandler(err, req, res, next) {
  console.error("[ErrorHandler]", err.stack || err.message);

  const status  = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = errorHandler;

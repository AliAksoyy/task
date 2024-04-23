const ErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json(ErrorTypes.SOMETHING_WENT_WRONG);
  }
};

module.exports = ErrorHandler;

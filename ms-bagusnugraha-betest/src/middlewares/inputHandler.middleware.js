const { InvalidJsonFormatError } = require("./jsonValidator.middleware");

exports.errorHandler = (err, req, res, next) => {
  if (req.is("application/json")) {
    if (err instanceof InvalidJsonFormatError) {
      return res.status(400).send({ message: err.message });
    } else if (err instanceof SyntaxError) {
      return res.status(400).send({ message: "Bad JSON format" });
    } else {
      res.status(500).send({ message: err.message });
    }
  } else {
    res.status(500).send({ message: "Internal error" });
  }

  next(err);
};

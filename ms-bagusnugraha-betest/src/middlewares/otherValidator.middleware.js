exports.contentTypeValid = (contentType) => {
  return (req, res, next) => {
    if (!req.is(contentType)) {
      res.status(400).send({ message: "Bad content-type format" });
    } else {
      next();
    }
  };
};

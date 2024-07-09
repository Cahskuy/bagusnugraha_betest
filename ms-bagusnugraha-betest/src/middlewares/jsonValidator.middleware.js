const Ajv = require("ajv").default;

class InvalidJsonFormatError extends Error {
  constructor(msg, error) {
    super(msg);
    this.name = "InvalidJsonFormatError";
    this.message = error;
  }
}

class Validator {
  aJv;
  constructor({ allErrors }) {
    this.aJv = new Ajv({
      allErrors: allErrors,
      useDefaults: true,
    });
    this.aJv.addKeyword({
      keyword: "isNotEmpty",
      type: "string",
      schema: false,
      validate: (data) => {
        return data.trim() != "";
      },
      errors: false,
    });

    require("ajv-formats")(this.aJv, ["email"]);
  }

  validate({ body }) {
    const aJvValidator = this.aJv.compile(body);
    return function (req, res, next) {
      if (!aJvValidator(req.body)) {
        var errorMsg;
        aJvValidator.errors.map((data, index) => {
          data.field = data.instancePath.replace(/\//g, ".");
          data.field = data.field.replace(/^./, "");

          if (data.keyword == "required") {
            data.field = data.field + "." + data.params.missingProperty;
            if (
              data.instancePath == "" &&
              data.field.length > 0 &&
              data.field.match(/\./g).length == 1
            ) {
              data.field = data.field.replace(/\./g, "");
            }
            data.message = `Must have required property '${data.field}'`;
          } else if (data.keyword == "isNotEmpty") {
            data.message = `'${data.field}' can not be empty`;
          } else if (data.keyword == "type") {
            data.message = `'${data.field}' must be ${data.params.type}`;
          } else if (data.keyword == "format") {
            data.message = `'${data.field}' must match format ${data.params.format}`;
          } else if (data.keyword == "enum") {
            data.message = `'${data.field}' must be equal to one of the allowed values ${data.params.allowedValues}`;
          } else if (data.keyword == "dependencies") {
            data.message =
              data.message.charAt(0).toUpperCase() + data.message.slice(1);
          } else {
            data.message = `'${data.field}' ${data.message}`;
          }

          if (index == 0) {
            errorMsg = data.message;
          }

          return data;
        });

        throw new InvalidJsonFormatError(
          "Json Input Format Is Invalid",
          errorMsg
        );
      }
      next();
    };
  }

  validateF(schema, target) {
    const aJvValidator = this.aJv.compile(schema);
    if (typeof target == "string") {
      target = JSON.parse(target);
    }

    if (!aJvValidator(target)) {
      return false;
      //throw new InvalidJsonFormatError('Json Input Format Is Invalid')
    }
    return target;
  }
}

exports.Validator = Validator;
exports.InvalidJsonFormatError = InvalidJsonFormatError;

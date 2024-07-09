var { Validator } = require("../middlewares/jsonValidator.middleware");

const schema = {};
schema.validator = new Validator({ allErrors: true });

schema.auth = require("./auth.schema");
schema.account = require("./account.schema");

module.exports = schema;

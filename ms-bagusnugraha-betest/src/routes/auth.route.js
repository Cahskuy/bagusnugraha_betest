const express = require("express");
const router = express.Router();
const authController = require("../controllers/account.controller");
const { validator, auth } = require("../schemas");
const {
  contentTypeValid,
} = require("../middlewares/otherValidator.middleware");

router.post(
  "/signup",
  [
    contentTypeValid("application/json"),
    validator.validate({ body: auth.signup }),
  ],
  authController.signup
);
router.post(
  "/login",
  [
    contentTypeValid("application/json"),
    validator.validate({ body: auth.login }),
  ],
  authController.login
);

module.exports = router;

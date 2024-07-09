const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/jwtAuth.middleware");
const { validator, account } = require("../schemas");
const {
  contentTypeValid,
} = require("../middlewares/otherValidator.middleware");

router.put(
  "/:accountId",
  [
    authMiddleware,
    contentTypeValid("application/json"),
    validator.validate({ body: account.update }),
  ],
  accountController.updateAccount
);
router.delete("/:accountId", authMiddleware, accountController.deleteAccount);

module.exports = router;

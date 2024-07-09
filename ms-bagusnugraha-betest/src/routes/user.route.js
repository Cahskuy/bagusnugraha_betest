const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/jwtAuth.middleware");

router.get(
  "/account-number/:accountNumber",
  authMiddleware,
  userController.getByAccountNumber
);
router.get(
  "/registration-number/:registrationNumber",
  authMiddleware,
  userController.getByRegistrationNumber
);
router.get(
  "/login-three-days-ago",
  authMiddleware,
  userController.getLoginByLastLoginDate
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/jwtAuth.middleware");

router.get(
  "/byAccountNumber/:accountNumber",
  authMiddleware,
  userController.getByAccountNumber
);
router.get(
  "/byRegistrationNumber/:registrationNumber",
  authMiddleware,
  userController.getByRegistrationNumber
);
router.get(
  "/loginByLastLoginDate",
  authMiddleware,
  userController.getLoginByLastLoginDate
);
router.put("/")

module.exports = router;

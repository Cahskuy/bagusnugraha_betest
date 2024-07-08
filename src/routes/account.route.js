const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/jwtAuth.middleware");

router.put("/:accountId", authMiddleware, accountController.updateAccount);
router.delete("/:accountId", authMiddleware, accountController.deleteAccount);

module.exports = router;

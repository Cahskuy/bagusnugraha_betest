const mongoose = require("mongoose");

const AccountLoginSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLoginDatetime: { type: Date },
  userId: { type: String, required: true, ref: "user_info" },
});

AccountLoginSchema.index({ userName: 1, lastLoginDatetime: 1 });

module.exports = mongoose.model("account_login", AccountLoginSchema);

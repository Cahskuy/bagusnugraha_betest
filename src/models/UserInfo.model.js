const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
});

UserInfoSchema.index(
  { accountNumber: 1, emailAddress: 1, registrationNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("user_info", UserInfoSchema);

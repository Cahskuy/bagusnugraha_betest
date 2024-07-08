const AccountLogin = require("../models/AccountLogin.model");
const UserInfo = require("../models/UserInfo.model");

exports.getByAccountNumber = async (req, res) => {
  try {
    const user = await UserInfo.findOne({
      accountNumber: req.params.accountNumber,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByRegistrationNumber = async (req, res) => {
  try {
    const user = await UserInfo.findOne({
      registrationNumber: req.params.registrationNumber,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLoginByLastLoginDate = async (req, res) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    const accounts = await AccountLogin.find({
      lastLoginDatetime: { $gt: date },
    }).lean();

    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

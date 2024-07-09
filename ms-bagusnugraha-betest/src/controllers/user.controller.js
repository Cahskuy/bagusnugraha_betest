const AccountLogin = require("../models/AccountLogin.model");
const UserInfo = require("../models/UserInfo.model");
const redisClient = require("../redis");

exports.getByAccountNumber = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const cacheKey = `userByAccountNumber:${accountNumber}`;

    var user = await redisClient.get(cacheKey);
    user = JSON.parse(user);
    if (!user) {
      user = await UserInfo.findOne({ accountNumber });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);
    }

    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByRegistrationNumber = async (req, res) => {
  try {
    const registrationNumber = req.params.registrationNumber;
    const cacheKey = `userByRegistrationNumber:${registrationNumber}`;

    var user = await redisClient.get(cacheKey);
    user = JSON.parse(user);
    if (!user) {
      user = await UserInfo.findOne({ registrationNumber: registrationNumber });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);
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

const AccountLogin = require("../models/AccountLogin.model");
const UserInfo = require("../models/UserInfo.model");
const redisClient = require("../redis");

exports.getByAccountNumber = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const cacheKey = `userByAccountNumber:${accountNumber}`;

    redisClient.get(cacheKey, async (err, cachedUser) => {
      if (err) {
        console.log("Redis get error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (cachedUser) {
        console.log("User info found in Redis cache");
        return res.json(JSON.parse(cachedUser));
      }

      const user = await UserInfo.findOne({ accountNumber });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);

      res.json(user);
    });
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

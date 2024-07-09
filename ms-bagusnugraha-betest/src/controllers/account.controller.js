const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AccountLogin = require("../models/AccountLogin.model");
const UserInfo = require("../models/UserInfo.model");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, userName, password } = req.body;
    const newUserId = `U-${Math.random().toString(36).substring(2, 11)}`;
    const newAccountId = `A-${Math.random().toString(36).substring(2, 11)}`;
    const accountNumber = `ACC-${Math.random().toString(36).substring(2, 11)}`;
    const registNumber = `REG-${Math.random().toString(36).substring(2, 11)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserInfo({
      userId: newUserId,
      fullName,
      accountNumber,
      emailAddress: email,
      registrationNumber: registNumber,
    });
    await newUser.save();

    const newAccount = new AccountLogin({
      accountId: newAccountId,
      userName,
      password: hashedPassword,
      lastLoginDatetime: null,
      userId: newUserId,
    });
    await newAccount.save();

    res.status(201).json({
      message: "User registered successfully",
      account: newAccount,
      user: newUser,
    });
  } catch (err) {
    switch (err.code) {
      case 11000:
        const fieldName = Object.keys(err.keyPattern)[0];
        res.status(400).json({
          message: `Duplicate key error: ${fieldName} already exists`,
        });
        break;
      default:
        res.status(500).json({ message: err.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const account = await AccountLogin.findOne({ userName });

    if (!account || !bcrypt.compareSync(password, account.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { accountId: account.accountId },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    account.lastLoginDatetime = new Date();
    await account.save();

    res.json({ message: "login success", token: token, data: account });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { userName, password } = req.body;
    const { fullName, email } = req.body;

    const account = await AccountLogin.findOne({ accountId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const userId = account.userId;
    await UserInfo.findOneAndUpdate(
      { userId },
      { fullName, emailAddress: email },
      { new: true }
    );

    await AccountLogin.findOneAndUpdate(
      { accountId },
      { userName, password },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Account and user information updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await AccountLogin.findOne({ accountId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const userId = account.userId;
    await UserInfo.findOneAndDelete(userId);

    await AccountLogin.findOneAndDelete(accountId);

    res
      .status(200)
      .json({ message: "Account and user information deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

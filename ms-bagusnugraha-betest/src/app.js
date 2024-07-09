const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const inputHandler = require("./middlewares/inputHandler.middleware");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require("./routes/auth.route");
const accountRoutes = require("./routes/account.route");
const userRoutes = require("./routes/user.route");

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  return res.status(404).send({
    message:
      "Oh you are lost, read the API documentation to find your way back home 😊",
  });
});

app.use(inputHandler.errorHandler);

module.exports = app;

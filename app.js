require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const port = process.env.PORT || 3000;
async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
}
dbConnection();

// Require Models
const User = require("./models/User");

app.post("/register", async (req, res) => {
  try {
    // Get Data
    const { username, email, password, role } = req.body;
    // Validated Data
    if (!username || !email || !password)
      return res.status(400).json({ msg: "Missing Data" });

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ msg: "Account Already Exist" });
    // Create User
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      role,
    });
    // Response
    res.status(201).json({
      msg: "Done Created User",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validated Data
    if (!email || !password)
      return res.status(400).json({ msg: "Missing Data" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Account Not Found Please Create Account" });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ msg: "Invalid Password" });

    const authCode = Buffer.from(user._id.toString()).toString("base64");

    res.status(200).json({
      msg: "Success Login",
      data: authCode,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

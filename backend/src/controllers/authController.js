const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signUp = async (req, res) => {
  try {
    const { username, firstName, lastName, password, confirmPassword } =
      req.body;

    if (!username || !firstName || !lastName || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "'Username already exists'" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: passwordHash,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully", success: true });
  } catch (err) {
    console.error(`Error creating user: ${err}`);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Sign in successful", token: token, success: true });
  } catch (err) {
    console.error(`Error signing in: ${err}`);
    return res.status(500).json({ message: "Error signing in" });
  }
};

module.exports = { signUp, signIn };

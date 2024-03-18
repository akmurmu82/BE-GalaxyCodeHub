const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // for generating JWT tokens
const User = require("../models/userModel");
const { verifyToken } = require("../middlewares/authMiddleware");

// Route to handle user registration
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // Remember to hash the password before saving to the database in production
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    // console.log(user)
    // If user not found or password does not match, return an error
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Invalid username/email or password" });
    }

    // If authentication succeeds, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET user profile endpoint
userRouter.get("/profile", verifyToken, async (req, res) => {
  try {
    // Find the user by user ID
    const user = await User.findById(req.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user profile information
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;

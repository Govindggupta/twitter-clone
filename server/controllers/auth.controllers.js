import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/util/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Invalid email format" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username is already taken" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ error: "Email is already taken" });

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include letters, numbers, and special characters.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({ newUser });
    } else res.status(400).json({ error: "Invalid user data" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const correctPassword = await bcrypt.compare(password, user?.password || "");
    
    if (!user || !correctPassword){
      return res.status(400).json({ error: "Incorrect username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({  user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
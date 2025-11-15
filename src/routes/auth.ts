import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";


const router = express.Router();

// signup
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.json({ message: "User created", userId: user._id });
  } catch (err) { next(err); }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret");
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) { next(err); }
});

// forgot password: generate reset token, save to user, (would email normally)
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "If user exists, reset link will be sent" }); // don't leak existance

    const token = crypto.randomBytes(32).toString("hex");
    const expiryMinutes = Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 60);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + expiryMinutes * 60 * 1000);
    await user.save();

    // TODO: send email with link containing token.
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(email)}`

     // Send Email
    await sendEmail(
      email,
      "Password Reset Request",
      `
        <h3>Password Reset</h3>
        <p>You requested a password reset. Click below to reset:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background: blue; color: #fff; text-decoration: none;">
          Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
      `
    );

    res.json({ message: "If user exists, reset link will be sent" });
  } catch (err) { next(err); }
});

// reset password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.resetPasswordToken || user.resetPasswordToken !== token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) { next(err); }
});

export default router;

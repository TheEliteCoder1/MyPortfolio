// Sign-up, sign-in, sign-out and "who am I" using JWT access tokens
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });

// POST /api/auth/signup
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

  if (await User.findOne({ email: email.toLowerCase() })) {
    return res.status(409).json({ message: "Email is already registered" });
  }
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  res.status(201).json({ token: createToken(user._id), user });
};

// POST /api/auth/signin
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  // Same message for both failures so attackers can't tell which part was wrong
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: createToken(user._id), user });
};

// POST /api/auth/signout
// JWTs are stateless: sign-out = the client deletes its stored token. The token simply expires on its own.
export const signOut = (req, res) => res.json({ message: "Signed out. Remove the token on the client." });

// GET /api/auth/me (protected: demonstrates authorized vs unauthorized)
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
};

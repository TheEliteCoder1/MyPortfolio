// CRUD for users. Passwords are hashed with bcrypt; the hash is never returned.
import bcrypt from "bcrypt";
import User from "../models/user-model.js";

const MIN_PASSWORD_LENGTH = 8;
const notFound = (res) => res.status(404).json({ message: "User not found" });

export const getUsers = async (req, res) => res.json(await User.find().sort({ createdAt: -1 }));

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user) : notFound(res);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  res.status(201).json(await User.create({ name, email, passwordHash }));
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const changes = { name, email };
  if (password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }
    changes.passwordHash = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });
  user ? res.json(user) : notFound(res);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  user ? res.json({ message: "User deleted" }) : notFound(res);
};

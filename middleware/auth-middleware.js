import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

// 1. Export as requireAuth (matches your user-routes.js)
export const requireAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user without password
      req.user = await User.findById(decoded.id).select('-passwordHash');
      if (!req.user) return res.status(401).json({ message: 'User not found' });
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 2. Export as requireAdmin (for role-based authorization)
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// 3. Export as protect and admin (in case you copied my earlier code)
export const protect = requireAuth;
export const admin = requireAdmin;
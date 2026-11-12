import express from 'express';
import { createContact, getContacts } from '../controllers/contact-controller.js';
import { protect, admin } from '../middleware/auth-middleware.js';

const router = express.Router();
router.post('/', createContact); // Public route for contact form
router.get('/', protect, admin, getContacts); // Admin only

export default router;
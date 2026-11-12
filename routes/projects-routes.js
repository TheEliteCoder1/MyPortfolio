import express from 'express';
import { getProjects, createProject, deleteProject } from '../controllers/project-controller.js';
import { protect, admin } from '../middleware/auth-middleware.js';

const router = express.Router();

// Regular users can GET (Read)
router.get('/', protect, getProjects);

// Only Admins can POST (Create) and DELETE
router.post('/', protect, admin, createProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;
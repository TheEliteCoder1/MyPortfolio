import { Router } from "express";
import Project from "../models/project-model.js";
import createCrudController from "../controllers/crud-factory.js";
// 1. Import requireAdmin here
import { requireAuth, requireAdmin } from "../middleware/auth-middleware.js";

const projects = createCrudController(Project, "Project");
const router = Router();

// Anyone can read (public)
router.get("/", projects.getAll);
router.get("/:id", projects.getOne);

// 2. Add requireAdmin to all write operations
router.post("/", requireAuth, requireAdmin, projects.create);
router.put("/:id", requireAuth, requireAdmin, projects.update);
router.delete("/:id", requireAuth, requireAdmin, projects.remove);

export default router;
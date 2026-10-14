import { Router } from "express";
import Project from "../models/project-model.js";
import createCrudController from "../controllers/crud-factory.js";
import { requireAuth } from "../middleware/auth-middleware.js";

const projects = createCrudController(Project, "Project");
const router = Router();

// Anyone can read; only signed-in users can create, update or delete
router.get("/", projects.getAll);
router.get("/:id", projects.getOne);
router.post("/", requireAuth, projects.create);
router.put("/:id", requireAuth, projects.update);
router.delete("/:id", requireAuth, projects.remove);
export default router;

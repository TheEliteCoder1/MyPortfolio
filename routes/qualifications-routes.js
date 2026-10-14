import { Router } from "express";
import Qualification from "../models/qualification-model.js";
import createCrudController from "../controllers/crud-factory.js";
import { requireAuth } from "../middleware/auth-middleware.js";

const qualifications = createCrudController(Qualification, "Qualification");
const router = Router();

// Anyone can read; only signed-in users can create, update or delete
router.get("/", qualifications.getAll);
router.get("/:id", qualifications.getOne);
router.post("/", requireAuth, qualifications.create);
router.put("/:id", requireAuth, qualifications.update);
router.delete("/:id", requireAuth, qualifications.remove);
export default router;

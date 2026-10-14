import { Router } from "express";
import Contact from "../models/contact-model.js";
import createCrudController from "../controllers/crud-factory.js";
import { requireAuth } from "../middleware/auth-middleware.js";

const contacts = createCrudController(Contact, "Contact");
const router = Router();

// Visitors can submit the contact form without logging in; everything else is protected
router.post("/", contacts.create);
router.get("/", requireAuth, contacts.getAll);
router.route("/:id").all(requireAuth).get(contacts.getOne).put(contacts.update).delete(contacts.remove);
export default router;

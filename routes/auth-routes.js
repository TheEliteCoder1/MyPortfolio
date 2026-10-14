import { Router } from "express";
import { signUp, signIn, signOut, getCurrentUser } from "../controllers/auth-controllers.js";
import { requireAuth } from "../middleware/auth-middleware.js";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me", requireAuth, getCurrentUser);
export default router;

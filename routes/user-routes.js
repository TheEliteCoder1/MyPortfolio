import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user-controllers.js";
import { requireAuth } from "../middleware/auth-middleware.js";

const router = Router();
router.use(requireAuth); // every user route needs a valid token
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
export default router;

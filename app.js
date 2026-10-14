// Express app: middleware, routes, error handling (kept separate from server.js)
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import contactRoutes from "./routes/contacts-routes.js";
import projectRoutes from "./routes/projects-routes.js";
import qualificationRoutes from "./routes/qualifications-routes.js";
import { notFound, errorHandler } from "./middleware/error-middleware.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // allow the React client
app.use(express.json());

// Welcome route (screenshot this for the assignment)
app.get("/", (req, res) => res.json({ message: "Welcome to My Portfolio application." }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

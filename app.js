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

// 1. ACTIVATE CORS (Must be placed before my routes)
const allowedOrigins = [
  process.env.CLIENT_URL, 
  "http://localhost:5173", // Vite local dev
  "http://localhost:3000"  // Cypress / local serve
].filter(Boolean); // Removes undefined if CLIENT_URL isn't set

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// 2. Body parser
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
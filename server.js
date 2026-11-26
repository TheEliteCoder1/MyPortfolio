// Backend entry point: connect to MongoDB, then start Express
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

await connectDB();

// Render requires binding to 0.0.0.0 so it can detect the open port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
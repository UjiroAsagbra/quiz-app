import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); 



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


// Import Routes
import userRoutes from "./routes/user.route.js";
app.use("/api/users", userRoutes);

import questionRoutes from "./routes/quiz.route.js";
app.use("/api/quiz", questionRoutes);

// ======== SERVE FRONTEND ==========
const __dirname = path.resolve(); // Required for ES Modules

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// ======== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

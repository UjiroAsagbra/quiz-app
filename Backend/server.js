import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();


app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://quiz-app-frontend-livid.vercel.app/" 
];

app.use(cors({
  origin: allowedOrigins, 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



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

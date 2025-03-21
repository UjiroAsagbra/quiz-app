import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import quizRoutes from "./routes/quiz.route.js";
import errorHandler from "./middleware/error.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Quiz API is running...");
});

// API routes
app.use("/api/quiz", quizRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

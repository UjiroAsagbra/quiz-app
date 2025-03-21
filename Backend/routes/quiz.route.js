import express from "express";
import {  getQuestions, saveScore, getLeaderboard } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/questions", getQuestions); // Fetch quiz questions
router.post("/save-score", saveScore); // Save user score
router.get("/leaderboard", getLeaderboard);

export default router;

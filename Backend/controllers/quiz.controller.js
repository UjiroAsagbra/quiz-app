import User from '../models/user.model.js';
import Quiz from "../models/quiz.model.js";

export const getQuestions = (async (req, res) => {
  try {
    const questions = await Quiz.aggregate([{ $sample: { size: 10 } }]); // Get 10 random questions
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Save user score to the database
export const saveScore = async (req, res) => {
  try {
    // Make sure the request has username and score
    const { username, score } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({ message: "Username and score are required" });
    }

    // Save to database
    const newUser = new User({ username, score });
    await newUser.save();

    res.status(201).json({ message: "Score saved successfully" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get leaderboard data
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10); // Get top 10 users
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
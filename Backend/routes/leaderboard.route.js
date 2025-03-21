import express from 'express';
import {getLeaderboard, getQuizLeaderboard} from '../controllers/leaderboard.controller.js';

const router = express.Router();

// @route   GET api/leaderboard
// @desc    Get top 10 users
// @access  Public
router.get('/', getLeaderboard);

// @route   GET api/leaderboard/quiz/:quizId
// @desc    Get leaderboard for a specific quiz
// @access  Public
router.get('/quiz/:quizId', getQuizLeaderboard);

export default router;
import  User from '../models/user.model.js'

// Get top 10 users with highest total scores
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ totalScore: -1 }) // Sort by total score in descending order
      .limit(10) // Get only top 10
      .select('username totalScore quizzesTaken'); // Only return necessary fields
    
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get leaderboard for a specific quiz
export const getQuizLeaderboard = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    
    // Find all users who have taken this quiz
    const users = await User.find({
      'quizzesTaken.quizId': quizId
    }).select('username quizzesTaken');
    
    // Extract and format data for the leaderboard
    const leaderboard = users.map(user => {
      const quizAttempt = user.quizzesTaken.find(
        quiz => quiz.quizId.toString() === quizId
      );
      
      return {
        username: user.username,
        score: quizAttempt ? quizAttempt.score : 0,
        date: quizAttempt ? quizAttempt.date : null
      };
    });
    
    // Sort by score in descending order and limit to top 10
    const topTen = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    res.json(topTen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
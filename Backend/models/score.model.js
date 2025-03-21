import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number,  // in seconds
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', ScoreSchema);

export default Score

import User from '../models/user.model.js';



// Update user score
export const updateUserScore = async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's score
    user.score += score; // Add new score to existing score
    await user.save();

    res.json({ message: "Score updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

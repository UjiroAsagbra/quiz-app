import { useEffect, useState } from "react";
import "./css/scoreboard.css";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/quiz/leaderboard")
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Error fetching leaderboard:", error));
  }, []);

  const handleRestart = () => {
    navigate("/questions");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className="leaderboard">Leaderboard</h2>
      <div className="podium">
        {leaderboard.length > 0 ? (
          <>
            <div className="second">🥈 {leaderboard[1]?.username || "Player 2"} <span>{leaderboard[1]?.score || 0}/10</span></div>
            <div className="first">🥇 {leaderboard[0]?.username || "Player 1"} <span>{leaderboard[0]?.score || 0}/10</span></div>
            <div className="third">🥉 {leaderboard[2]?.username || "Player 3"} <span>{leaderboard[2]?.score || 0}/10</span></div>
          </>
        ) : (
          <p>No scores yet.</p>
        )}
      </div>

      <ul className="player-list">
        {leaderboard.slice(3).map((player, index) => (
          <li key={player._id}>
            {index + 4} {player.username} <span>{player.score}/10</span>
          </li>
        ))}
      </ul>

      <button className="btn-green score" onClick={handleRestart}>Retake Quiz</button>
      <button className="btn-green score" onClick={handleHome}>Home</button>
    </div>
  );
};

export default Scoreboard;

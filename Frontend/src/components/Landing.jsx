import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/css/landing.css";

const Landing = () => {
  const [user, setUser] = useState("");

  const handleUser = (e) => {
    setUser(e.target.value); // Update state first
  };

  // Use useEffect to update localStorage AFTER state updates
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    }
  }, [user]); // Runs whenever user changes

  return (
    <div className="landing">
      <h1 className="header">SmartyPants</h1>
      <p className="title">Enter Your Name</p>

      <input
        type="text"
        className="user input"
        placeholder="Jane Doe"
        value={user}
        onChange={handleUser}
      />

      <ol className="rules">
        <li>Answer Within Time – Each question must be answered within a set time limit (e.g., 30 seconds).</li>
        <li>One Answer Per Question – You can only select one answer before moving to the next question.</li>
        <li>Skip Option Available – If you're unsure, you can skip a question, but you won’t earn points for it.</li>
        <li>Scoring System – Earn points for correct answers, and track your total score at the end.</li>
        <li>Have Fun & Learn! – The quiz is meant to be engaging and educational, so enjoy the process!</li>
      </ol>

      <Link className="btn" to="/questions">Start</Link>
    </div>
  );
};

export default Landing;

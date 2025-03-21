import { useState, useEffect } from "react";
import Counting from "./CountdownTimer.jsx";
import "./css/questions.css";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [resetTimer, setResetTimer] = useState(null);
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz/questions") // Call API to get random questions
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const handleNext = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setResetTimer((prev) => !prev);
    } else {
      handleSubmit();
    }
  };

  const handleTimeUp = () => {
    handleNext();
  };

  const handlePrev = () => {
    setActiveQuestion((prev) => prev - 1);
  };

  const { question, options, _id } = questions[activeQuestion];

  const handleSelect = (id, option) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [id]: option,
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswer[q._id] === q.answer) {
        correctCount++;
      }
    });
  
    const username = localStorage.getItem("user"); // Get username
    const score = correctCount; // Get score
  
    if (!username) {
      alert("Please enter your name on the landing page.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/quiz/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score }),
      });
  
      if (response.ok) {
        localStorage.setItem("quizScore", score);
        navigate("/scoreboard");
      } else {
        const errorData = await response.json();
        console.error("Error saving score:", errorData);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  


  return (
    <div className="q">
      <div className="head">
        <p onClick={handlePrev} className="prev">&lt; Previous</p>
        <p className="progressbar">{activeQuestion + 1}/{questions.length}</p>
        <Counting key={resetTimer} onTimeUp={handleTimeUp} className="counting" />
      </div>

      <div className="questions">
        <h2 className="question">{question}</h2>
        <ul>
          {options.map((option) => (
            <li key={option}>
              <input
                type="radio"
                name={`question-${_id}`}
                value={option}
                id={`${_id}-${option}`}
                checked={selectedAnswer[_id] === option}
                onChange={() => handleSelect(_id, option)}
                className="option"
              />
              <label htmlFor={`${_id}-${option}`} className="options">{option}</label>
            </li>
          ))}
        </ul>
      </div>

      {activeQuestion < questions.length - 1 ? (
        <button onClick={handleNext} className="btn-green">Next</button>
      ) : (
        <button onClick={handleSubmit} className="btn-green">Submit</button>
      )}
    </div>
  );
};

export default Questions;

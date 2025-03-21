import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/counting.css"; // Import the external CSS
import Questions from "./Questions";

const Counting = ({onTimeUp }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [count, setCount] = useState(10); 
  const navigate = useNavigate();
  const progressCircleRef = useRef(null);

  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    if (progressCircleRef.current) {
      progressCircleRef.current.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
      progressCircleRef.current.style.transition = "stroke-dashoffset 0.5s ease-in-out";
    }

    const progressInterval = setInterval(() => {
      if (count === 1) {
        clearInterval(progressInterval);
        onTimeUp ()
        setProgressPercent(100);
      } else {
        const newPercent = ((10 - count) * 100) ;
        setProgressPercent(newPercent);

        if (progressCircleRef.current) {
          progressCircleRef.current.style.strokeDashoffset =
            CIRCUMFERENCE - (newPercent / 100) * CIRCUMFERENCE;
        }
      }

      if (count === 0) {
        clearInterval(progressInterval);
       //navigate("/other"); // Redirect when countdown reaches 0
      }

      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [count, navigate, CIRCUMFERENCE, onTimeUp ]);

  return (
    <div className="center-card">
      <div className="countdown-circle">
        <svg width="250" height="250">
          {/* Background Circle */}
          <circle className="track" r={RADIUS} cx="125" cy="125"></circle>

          {/* Progress Circle */}
          <circle
            ref={progressCircleRef} // Attach the ref here
            className="progress"
            r={RADIUS}
            cx="125"
            cy="125"
          ></circle>

          {/* Countdown Text */}
          {count > -1 && (
            <text x="50%" y="50%" className="progress-text">
              {count < 10 ? `0${count}` : count}
            </text>
          )}
        </svg>
      </div>
     
      </div>
  );
};

export default Counting;

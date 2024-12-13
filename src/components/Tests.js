// src/components/Tests.js
import React, { useState } from "react";

const Tests = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  return (
    <div>
      <h2>Tests</h2>
      <div>
        <label>1. What is 2 + 2?</label>
        <input
          type="text"
          onChange={(e) => handleAnswerChange("q1", e.target.value)}
        />
      </div>
      <button onClick={() => console.log("Submitted Answers:", answers)}>
        Submit Test
      </button>
    </div>
  );
};

export default Tests;

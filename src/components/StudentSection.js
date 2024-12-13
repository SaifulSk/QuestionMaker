// src/components/StudentSection.js
import React, { useState } from "react";

const StudentSection = () => {
  const [doubt, setDoubt] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleDoubtSubmit = () => {
    console.log("Doubt Submitted:", doubt);
    setDoubt("");
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback Submitted:", feedback);
    setFeedback("");
  };

  return (
    <div>
      <h2>Student Section</h2>
      <div>
        <h3>Post a Doubt</h3>
        <input
          type="text"
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
        />
        <button onClick={handleDoubtSubmit}>Submit Doubt</button>
      </div>
      <div>
        <h3>Provide Feedback</h3>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
      </div>
    </div>
  );
};

export default StudentSection;

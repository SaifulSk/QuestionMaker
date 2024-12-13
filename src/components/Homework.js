// src/components/Homework.js
import React, { useState } from "react";

const Homework = () => {
  const [homeworkList] = useState([
    { subject: "Math", assignment: "Chapter 2 Exercise", status: "Pending" },
    { subject: "Science", assignment: "Lab Report", status: "Completed" },
  ]);

  return (
    <div>
      <h2>Homework</h2>
      <ul>
        {homeworkList.map((hw, index) => (
          <li key={index}>
            {hw.subject}: {hw.assignment} - {hw.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homework;

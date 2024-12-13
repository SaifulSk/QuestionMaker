// src/components/Schedule.js
import React, { useState } from "react";

const Schedule = () => {
  const [schedules] = useState([
    { subject: "Math", date: "2024-11-10", time: "10:00 AM" },
    { subject: "Science", date: "2024-11-11", time: "2:00 PM" },
  ]);

  return (
    <div>
      <h2>Student Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.subject}</td>
              <td>{schedule.date}</td>
              <td>{schedule.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;

// src/components/FeeManagement.js
import React, { useState } from "react";

const FeeManagement = () => {
  const [fees] = useState([
    { student: "John Doe", status: "Paid", amount: 500 },
    { student: "Jane Smith", status: "Due", amount: 500 },
  ]);

  return (
    <div>
      <h2>Fee Management</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index}>
              <td>{fee.student}</td>
              <td>{fee.status}</td>
              <td>${fee.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeManagement;

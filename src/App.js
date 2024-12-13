// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Schedule from "./components/Schedule";
import FeeManagement from "./components/FeeManagement";
import Tests from "./components/Tests";
import Homework from "./components/Homework";
import ParentReport from "./components/ParentReport";
import Contact from "./components/Contact";
import StudentSection from "./components/StudentSection";
import ReferralProgram from "./components/ReferralProgram";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/fee-management" element={<FeeManagement />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/parent-report" element={<ParentReport />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-section" element={<StudentSection />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
      </Routes>
    </Router>
  );
}

export default App;

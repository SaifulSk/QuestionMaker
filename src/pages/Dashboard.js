// // src/pages/Dashboard.js
// import React from "react";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     // <div>
//     //   <h1>Welcome to Tuition Plus</h1>
//     //   <nav>
//     //     <Link to="/schedule">Student Schedule</Link>
//     //     <Link to="/fee-management">Fee Management</Link>
//     //     <Link to="/tests">Tests</Link>
//     //     <Link to="/homework">Homework</Link>
//     //     <Link to="/parent-report">Parent Reporting</Link>
//     //     <Link to="/contact">Contact</Link>
//     //     <Link to="/student-section">Student Section</Link>
//     //     <Link to="/referral-program">Referral Program</Link>
//     //   </nav>
//     // </div>

//   );
// };

// export default Dashboard;

// src/pages/Dashboard.js
import "./Dashboard.css"; // Add a CSS file for styling
import React, { useState } from "react";
import html2canvas from "html2canvas"; // Import html2canvas for screenshot conversion
import jsPDF from "jspdf"; // Import jsPDF to generate the PDF

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "text-only", // Default value set to "text-only"
    text: "",
    image: "",
    options: [],
    marks: "",
  });
  const [currentOption, setCurrentOption] = useState(""); // For handling new options
  const [error, setError] = useState(""); // To display error message

  const handleAddQuestion = (e) => {
    e.preventDefault();

    // Validate fields
    if (!currentQuestion.text || !currentQuestion.marks) {
      setError("Please fill in both question text and marks.");
      return;
    }
    if (
      currentQuestion.type === "text-with-multiple-options" &&
      currentQuestion.options.length === 0
    ) {
      setError("Please add at least one option for the question.");
      return;
    }

    // Reset error message if fields are valid
    setError("");

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      type: "text-only", // Default value set to "text-only"
      text: "",
      image: "",
      options: [],
      marks: "",
    });
    setCurrentOption(""); // Reset current option input
  };

  const handleDeleteQuestion = (indexToDelete) => {
    const updatedQuestions = questions.filter(
      (_, index) => index !== indexToDelete
    );
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentQuestion((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddOption = (e) => {
    e.preventDefault();

    if (!currentOption.trim()) return; // Ignore empty options
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, currentOption],
    }));
    setCurrentOption(""); // Clear input
  };

  const handleDeleteOption = (indexToDelete) => {
    const updatedOptions = currentQuestion.options.filter(
      (_, index) => index !== indexToDelete
    );
    setCurrentQuestion((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleGeneratePDF = async () => {
    const questionsPreviewElement =
      document.querySelector(".questions-preview");
    const listItems = questionsPreviewElement.querySelectorAll("li");

    const doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.height;
    let currentY = 10; // Y position for adding content

    const addItemToPDF = (liItem) => {
      const deleteButton = liItem.querySelector(".delete-question-icon");
      if (deleteButton) {
        deleteButton.style.display = "none"; // Hide the delete button
      }

      return new Promise((resolve) => {
        html2canvas(liItem, { useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL("image/jpeg");
          const imgHeight = canvas.height * (210 / canvas.width); // Maintain aspect ratio

          if (currentY + imgHeight > pageHeight) {
            doc.addPage();
            currentY = 10; // Reset Y position for the new page
          }

          doc.addImage(imgData, "JPEG", 10, currentY, 190, imgHeight);
          currentY += imgHeight + 5; // Update Y position for the next image

          deleteButton.style.display = "block";

          resolve();
        });
      });
    };

    for (const liItem of listItems) {
      await addItemToPDF(liItem);
    }

    doc.save("question-paper.pdf");
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Question Paper Maker</h1>

      <form className="question-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="questionType">Question Type:</label>
            <select
              id="questionType"
              value={currentQuestion.type}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, type: e.target.value })
              }
            >
              <option value="text-only">Text Only</option>
              <option value="text-with-image">Text with Image</option>
              <option value="text-with-multiple-options">
                Text with Multiple Answer Options
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks:</label>
            <input
              id="marks"
              type="number"
              value={currentQuestion.marks}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  marks: e.target.value,
                })
              }
            />
          </div>
        </div>

        <label>Question Text:</label>
        <textarea
          value={currentQuestion.text}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, text: e.target.value })
          }
          rows="4"
          placeholder="Enter your question text here..."
        />

        {currentQuestion.type === "text-with-image" && (
          <>
            <label>Image:</label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </>
        )}

        {currentQuestion.type === "text-with-multiple-options" && (
          <>
            <label>Options:</label>
            <div className="options-section">
              <input
                type="text"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                placeholder="Enter an option"
              />
              <button onClick={handleAddOption} className="add-option-button">
                Add Option
              </button>
            </div>
            <ul className="options-list">
              {currentQuestion.options.map((option, index) => (
                <li key={index} className="option-item">
                  {option}{" "}
                  <button
                    className="delete-option-icon"
                    onClick={() => handleDeleteOption(index)}
                  >
                    &#10005;
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          onClick={handleAddQuestion}
          className="add-question-button"
        >
          Add Question
        </button>
      </form>

      {questions.length > 0 && (
        <>
          <hr />
          <h2 className="preview-title">Preview Questions</h2>
          <ul className="questions-preview">
            {questions.map((question, index) => (
              <li key={index} className="question-item">
                <div className="question-header">
                  <p>
                    <strong>Question {index + 1}:</strong> {question.text}
                  </p>
                  {question.marks && (
                    <span className="marks">[ {question.marks} ]</span>
                  )}
                </div>
                {question.type === "text-with-image" && question.image && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={question.image}
                      alt={`Question ${index + 1}`}
                      className="question-image"
                    />
                  </div>
                )}
                {question.type === "text-with-multiple-options" && (
                  <ol className="options-preview" type="a">
                    {question.options.map((option, i) => (
                      <li key={i} className="option-preview-item">
                        {option}
                      </li>
                    ))}
                  </ol>
                )}
                <button
                  className="delete-question-icon"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this question?"
                      )
                    ) {
                      handleDeleteQuestion(index);
                    }
                  }}
                >
                  &#10005;
                </button>
              </li>
            ))}
          </ul>

          <button onClick={handleGeneratePDF} className="generate-pdf-button">
            Generate PDF
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;

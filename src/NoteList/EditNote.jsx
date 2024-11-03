


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './App.scss'
const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the fileToEdit and index passed through location state
  const { fileToEdit, index } = location.state;
  const [newFileName, setNewFileName] = useState(fileToEdit.name);

  // Function to handle saving the new file name
  const handleSave = () => {
    // Get existing files from local storage
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    // Update the file name in the file array
    savedFiles[index] = { ...savedFiles[index], name: newFileName };

    // Save the updated files array to local storage
    localStorage.setItem("uploadedFiles", JSON.stringify(savedFiles));

    // Show a success toast notification
    toast.success("File name updated successfully!");

    // Navigate back to home page or AddNote component
    navigate("../NoteList");
  };

  return (
    <div className="edit-file-container">
      <h2 className="text-2xl font-bold mb-4">Rename File</h2>
      <input
        type="text"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
        className="input-edit w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditNote;
// src/NoteList/EditNote.jsx

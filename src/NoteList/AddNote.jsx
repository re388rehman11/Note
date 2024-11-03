


import React, { useState, useEffect } from "react";
import { useNotes } from "./NoteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./App.scss";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const { addNote, notes } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(savedFiles);
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    localStorage.setItem("uploadedFiles", JSON.stringify([...files, ...newFiles]));
  };

//   const handleEditFile = (index) => {
//     const fileToEdit = files[index];
//     navigate("../EditNote", { state: { fileToEdit } });
//   };
const handleEditFile = (index) => {
    const fileToEdit = files[index];
    navigate("../EditNote", { state: { fileToEdit, index } }); // Pass index along with fileToEdit
};


  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    toast.success("File removed successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the newNote object based on the provided structure
    const newNote = {
      id: Date.now(), // Generate a unique ID for the note
      title,
      content,
      files, // Include the array of uploaded files
      category: 'Subject Category', // Specify the category (this can be a state if dynamic)
    };
    
    // Call the function to add the note
    addNote(newNote);
    toast.success("Note added successfully!");
    
    // Clear input fields
    setTitle("");
    setContent("");
    setFiles([]);
  };

  const handleLike = (noteId) => {
    toast.info(`Liked note: ${noteId}`);
  };

  const handleDislike = (noteId) => {
    toast.info(`Disliked note: ${noteId}`);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Add Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg cursor-pointer"
        />
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Uploaded Files:</h3>
          {files.length === 0 ? (
            <p className="text-gray-500">No files uploaded.</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {files.map((file, index) => (
                <li key={index} className="mb-2 flex items-center justify-between">
                  <span className="flex-1 text-gray-800">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {file.name}
                    </a>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      onClick={() => handleEditFile(index)}
                      className="text-gray-600 hover:text-gray-800 cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit className="text-xs" />
                    </span>
                    <span
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-600 hover:text-gray-800 cursor-pointer"
                      title="Remove"
                    >
                      <FaTrash className="text-xs" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Note
        </button>
      </form>

      {/* Display the notes in a comment-like style */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800">Notes:</h3>
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow-md mt-2">
            <h4 className="font-bold text-lg text-gray-800">{note.title}</h4>
            <p className="text-gray-600">{note.content}</p>
            {/* Like and Dislike buttons */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(note.id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  <FaThumbsUp className="text-lg" />
                  <span className="text-sm">Like</span>
                </button>
                <button
                  onClick={() => handleDislike(note.id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  <FaThumbsDown className="text-lg" />
                  <span className="text-sm">Dislike</span>
                </button>
              </div>
            </div>
            {/* Optionally, you can display uploaded files here as well */}
            {note.files.length > 0 && (
              <div className="mt-2">
                <h5 className="font-semibold">Uploaded Files:</h5>
                <ul className="list-disc list-inside text-gray-700">
                  {note.files.map((file, index) => (
                    <li key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNote;

// // // src/notes/NoteContext.jsx
// // import React, { createContext, useContext, useState } from 'react';

// // // Create a context
// // const NoteContext = createContext();

// // // Create a provider component
// // export const NoteProvider = ({ children }) => {
// //     const [notes, setNotes] = useState([]);

// //     // Create a note
// //     const addNote = (note) => {
// //         setNotes([...notes, note]);
// //     };

// //     // Edit a note
// //     const editNote = (id, updatedNote) => {
// //         setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
// //     };

// //     // Delete a note
// //     const deleteNote = (id) => {
// //         setNotes(notes.filter(note => note.id !== id));
// //     };

// //     // Update a note's file
// //     const updateFile = (updatedNote) => {
// //         setNotes((prevNotes) =>
// //             prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
// //         );
// //     };

// //     return (
// //         <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, updateFile }}>
// //             {children}
// //         </NoteContext.Provider>
// //     );
// // };

// // // Custom hook to use the NoteContext
// // export const useNotes = () => {
// //     return useContext(NoteContext);
// // };



// // src/notes/NoteContext.jsx
// import React, { createContext, useContext, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid'; // To generate unique ids

// // Create a context
// const NoteContext = createContext();

// // Create a provider component
// export const NoteProvider = ({ children }) => {
//     const [notes, setNotes] = useState([]);

//     // Create a new note with a unique id
//     const addNote = (note) => {
//         setNotes([...notes, { ...note, id: uuidv4() }]);
//     };

//     // Edit an existing note
//     const editNote = (id, updatedNote) => {
//         setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
//     };

//     // Delete a note by id
//     const deleteNote = (id) => {
//         setNotes(notes.filter(note => note.id !== id));
//     };

//     return (
//         <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
//             {children}
//         </NoteContext.Provider>
//     );
// };

// // Custom hook to use the NoteContext
// export const useNotes = () => {
//     return useContext(NoteContext);
// };



import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

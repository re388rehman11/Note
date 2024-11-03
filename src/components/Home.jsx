// import React from 'react';
// import { Link } from 'react-router-dom';
// import './App.scss'; // Import the SCSS file
// import img1 from "../assets/Images/img1.png"

// const fakeNotes = [
//     {
//         id: 1,
//         title: 'Math Homework',
//         description: 'Complete exercises from Chapter 4',
//         image: 'https://via.placeholder.com/150/007bff/ffffff?text=Math', // Placeholder image
//     },
//     {
//         id: 2,
//         title: 'Science Project',
//         description: 'Prepare presentation on renewable energy',
//         image: 'https://via.placeholder.com/150/28a745/ffffff?text=Science', // Placeholder image
//     },
//     {
//         id: 3,
//         title: 'History Essay',
//         description: 'Write about the Industrial Revolution',
//         image: 'https://via.placeholder.com/150/dc3545/ffffff?text=History', // Placeholder image
//     },
//     // Add more fake notes as needed
// ];

// const Home = () => {
//     return (
//         <div className="home-container">
//             <div className="home-content">
//                 <div className="home-paragraph-container">
//                     <h1 className="home-title">Welcome to Your Study Notes</h1>
//                     <p className="home-paragraph">
//                         Organize your study materials efficiently! Whether you're preparing for exams or managing course notes,
//                         this app allows you to create, edit, and manage your notes easily. Start adding your notes today and
//                         improve your study routine!
//                     </p>
//                     <Link to='../NoteList/AddNote' className="home-button">
//                         Add New Note
//                     </Link>
//                 </div>
//                 <img src={img1} alt="Study Notes" className="home-image" />
//             </div>

//             {/* Card Gallery Section */}
//             <div className="card-gallery">
//                 {fakeNotes.map(note => (
//                     <div className="card" key={note.id}>
//                         <img src={note.image} alt={note.title} className="card-image" />
//                         <h3>{note.title}</h3>
//                         <p>{note.description}</p>
//                         <div className="card-buttons">
//                             <Link to={`/NoteList/EditNote/${note.id}`} className="btn-edit">Edit</Link>
//                             <button className="btn-delete" onClick={() => handleDelete(note.id)}>Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // Dummy function for delete action
// const handleDelete = (id) => {
//     console.log(`Deleted note with id: ${id}`);
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./App.scss"; // Import the SCSS file
import img1 from "../assets/Images/img1.png";

import LogoCircle from "./LogoCircle";
import Homefeatures from "./Homefeatures";


const fakeNotes = [
  {
    id: 1,
    title: "Math Homework",
    description: "Complete exercises from Chapter 4",
    image: "https://via.placeholder.com/150/007bff/ffffff?text=Math", // Placeholder image
  },
  {
    id: 2,
    title: "Science Project",
    description: "Prepare presentation on renewable energy",
    image: "https://via.placeholder.com/150/28a745/ffffff?text=Science", // Placeholder image
  },
  {
    id: 3,
    title: "History Essay",
    description: "Write about the Industrial Revolution",
    image: "https://via.placeholder.com/150/dc3545/ffffff?text=History", // Placeholder image
  },
  {
    id: 4,
    title: "English Homework",
    description: "Complete exercises from Chapter 4",
    image: "https://via.placeholder.com/150/007bff/ffffff?text=Math", // Placeholder image
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-paragraph-container">
          <h1 className="home-title">Welcome to Your Study Notes</h1>
          <p className="home-paragraph">
            Organize your study materials efficiently! Whether you're preparing
            for exams or managing course notes, this app allows you to create,
            edit, and manage your notes easily. Start adding your notes today
            and improve your study routine!
          </p>
          <Link to="../NoteList/AddNote" className="home-button">
            Add New Note
          </Link>
        </div>
        <img src={img1} alt="Study Notes" className="home-image" />
      </div>

      {/* Card Gallery Section */}
      <div className="card-gallery">
        {fakeNotes.map((note) => (
          <div className="card" key={note.id}>
            <img src={note.image} alt={note.title} className="card-image" />
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <div className="card-buttons">
              <Link to="../NoteList/AddNote" className="btn-edit">
                Edit
              </Link>
             
                <Link to="../NoteList/AddNote" className="btn-edit">
                  Delete
                </Link>
              
            </div>
          </div>
        ))}
      </div>

      <div className="home-container">
        {/* Section */}
        
      </div>
      <div className="home-container">
        {/* Section */}
        <Homefeatures />
      </div>
      <div className="home-container">
        {/* Section */}
        <LogoCircle />
      </div>
    </div>
  );
};

// Dummy function for delete action
const handleDelete = (id) => {
  console.log(`Deleted note with id: ${id}`);
};

export default Home;

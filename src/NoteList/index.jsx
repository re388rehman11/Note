// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import AddNote from "./AddNote";
// import EditNote from "./EditNote";
// import NoteContext from "./NoteContext";
// import NoteList from "./NoteList";


//   return (
//     <>
//       {showHeaderAndFooter && <Header />}
//       <main>
//         <Routes>
//           <Route path="/AddNote" element={<AddNote />} />

//           <Route path="/EditNote" element={< EditNote/>} />

//           <Route path="/NoteContext" element={<NoteContext />} />

        
//           <Route path="/NoteList" element={<NoteList />} />
//         </Routes>
//       </main>
//       </>
//   );



import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteList from './NoteList';

const NotesIndex = () => {
  return (
    <Routes>
      <Route path="/AddNote" element={<AddNote />} />
      <Route path="/EditNote" element={<EditNote />} />
      <Route path="/NoteList" element={<NoteList />} />
    </Routes>
  );
};

export default NotesIndex;

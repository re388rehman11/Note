// import React, { useState } from 'react';
// import { useNotes } from './NoteContext'; // Adjust the path as necessary
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const NoteList = () => {
//     const { notes, deleteNote, updateNote } = useNotes();
//     const [editingNoteId, setEditingNoteId] = useState(null);
//     const [editedTitle, setEditedTitle] = useState('');
//     const [editedFiles, setEditedFiles] = useState({}); // To manage edited file names

//     // Organize notes into categories
//     const categorizedNotes = notes.reduce((acc, note) => {
//         const category = note.category || 'Uncategorized';
//         if (!acc[category]) {
//             acc[category] = [];
//         }
//         acc[category].push(note);
//         return acc;
//     }, {});

//     const handleEditClick = (note) => {
//         setEditingNoteId(note.id);
//         setEditedTitle(note.title);
//         // Initialize editedFiles with current file names
//         const filesObj = note.files.reduce((obj, file, index) => {
//             obj[index] = file.name; // Keep track of index for each file
//             return obj;
//         }, {});
//         setEditedFiles(filesObj);
//     };

//     const handleUpdateNote = (noteId) => {
//         const updatedNote = {
//             ...notes.find(note => note.id === noteId),
//             title: editedTitle,
//             files: Object.entries(editedFiles).map(([index, name]) => ({
//                 ...notes.find(note => note.id === noteId).files[index],
//                 name
//             }))
//         };
//         updateNote(updatedNote);
//         setEditingNoteId(null);
//     };

//     return (
//         <div>
//             <h2>Notes</h2>
//             {Object.keys(categorizedNotes).length === 0 ? (
//                 <p>No notes available.</p>
//             ) : (
//                 Object.keys(categorizedNotes).map(category => (
//                     <div key={category}>
//                         <h3>{category}</h3>
//                         <ul>
//                             {categorizedNotes[category].map(note => (
//                                 <li key={note.id}>
//                                     {editingNoteId === note.id ? (
//                                         <div>
//                                             <input 
//                                                 type="text" 
//                                                 value={editedTitle} 
//                                                 onChange={(e) => setEditedTitle(e.target.value)} 
//                                             />
//                                             <button onClick={() => handleUpdateNote(note.id)} className="ml-2 text-green-500 hover:underline">
//                                                 Save
//                                             </button>
//                                         </div>
//                                     ) : (
//                                         <div>
//                                             <h4>{note.title}</h4>
//                                             <button onClick={() => handleEditClick(note)} className="ml-2 text-blue-500 hover:underline">
//                                                 Edit Title
//                                             </button>
//                                         </div>
//                                     )}
//                                     <p>{note.content}</p>
//                                     <p><strong>Uploaded Files:</strong></p>
//                                     <ul>
//                                         {note.files.map((file, index) => (
//                                             <li key={index}>
//                                                 {editingNoteId === note.id ? (
//                                                     <div>
//                                                         <input 
//                                                             type="text" 
//                                                             value={editedFiles[index] || file.name} 
//                                                             onChange={(e) => setEditedFiles({...editedFiles, [index]: e.target.value})} 
//                                                         />
//                                                     </div>
//                                                 ) : (
//                                                     <a 
//                                                         href={file.url} 
//                                                         target="_blank" 
//                                                         rel="noopener noreferrer" 
//                                                         className="hover:underline"
//                                                     >
//                                                         {file.name}
//                                                     </a>
//                                                 )}
//                                                 <Link to={`/edit/${note.id}/${index}`} className="ml-2 text-blue-500 hover:underline">
//                                                     Edit
//                                                 </Link>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                     <button onClick={() => deleteNote(note.id)} className="mt-2 text-red-600 hover:underline">
//                                         Delete
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default NoteList;




import React, { useState } from 'react';
import { useNotes } from './NoteContext'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NoteList = () => {
    const { notes, deleteNote, updateNote } = useNotes();
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedFiles, setEditedFiles] = useState({}); // To manage edited file names
    const [searchTerm, setSearchTerm] = useState(''); // To manage search input
    const [comments, setComments] = useState({}); // To manage comments for each note
    const TITLE_LIMIT = 50; // Character limit for the note title
    const FILE_NAME_LIMIT = 30; // Character limit for file names

    // Organize notes into categories
    const categorizedNotes = notes.reduce((acc, note) => {
        const category = note.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(note);
        return acc;
    }, {});

    const handleEditClick = (note) => {
        setEditingNoteId(note.id);
        setEditedTitle(note.title);
        const filesObj = note.files.reduce((obj, file, index) => {
            obj[index] = file.name; // Keep track of index for each file
            return obj;
        }, {});
        setEditedFiles(filesObj);
    };

    const handleUpdateNote = (noteId) => {
        const currentNote = notes.find(note => note.id === noteId);
        const updatedNote = {
            ...currentNote,
            title: editedTitle,
            files: currentNote.files.map((file, index) => ({
                ...file,
                name: editedFiles[index] || file.name // Use edited name or original name if not edited
            }))
        };

        updateNote(updatedNote);
        setEditingNoteId(null);
        setEditedTitle(''); // Clear title after updating
        setEditedFiles({}); // Clear edited files after updating
    };

    const handleCommentChange = (noteId, event) => {
        const newComment = event.target.value;
        setComments(prevComments => ({
            ...prevComments,
            [noteId]: newComment
        }));
    };

    const addComment = (noteId) => {
        if (!comments[noteId]) return; // Don't add empty comments
        const noteComments = notes.find(note => note.id === noteId).comments || [];
        const updatedComments = [...noteComments, comments[noteId]];
        const updatedNote = { ...notes.find(note => note.id === noteId), comments: updatedComments };
        updateNote(updatedNote);
        setComments(prevComments => ({ ...prevComments, [noteId]: '' })); // Clear comment input
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderNotes = () => {
        return Object.keys(categorizedNotes).map(category => (
            <div key={category}>
                <h3>{category}</h3>
                <ul>
                    {categorizedNotes[category].map(note => (
                        <li key={note.id}>
                            {editingNoteId === note.id ? (
                                <div>
                                    <input 
                                        type="text" 
                                        value={editedTitle} 
                                        maxLength={TITLE_LIMIT} // Set maxLength for title
                                        onChange={(e) => setEditedTitle(e.target.value)} 
                                        placeholder={`Title (max ${TITLE_LIMIT} chars)`}
                                    />
                                    <span className="text-gray-500">{editedTitle.length}/{TITLE_LIMIT}</span> {/* Show current length */}
                                    <button onClick={() => handleUpdateNote(note.id)} className="ml-2 text-green-500 hover:underline">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h4>{note.title}</h4>
                                    <button onClick={() => handleEditClick(note)} className="ml-2 text-blue-500 hover:underline">
                                        Edit Title
                                    </button>
                                </div>
                            )}
                            <p>{note.content}</p>
                            <p><strong>Uploaded Files:</strong></p>
                            <ul>
                                {note.files.map((file, index) => (
                                    <li key={index}>
                                        {editingNoteId === note.id ? (
                                            <div>
                                                <input 
                                                    type="text" 
                                                    value={editedFiles[index] || file.name} 
                                                    maxLength={FILE_NAME_LIMIT} // Set maxLength for file names
                                                    onChange={(e) => setEditedFiles({...editedFiles, [index]: e.target.value})} 
                                                    placeholder={`File name (max ${FILE_NAME_LIMIT} chars)`}
                                                />
                                                <span className="text-gray-500">{(editedFiles[index] || file.name).length}/{FILE_NAME_LIMIT}</span> {/* Show current length */}
                                            </div>
                                        ) : (
                                            <a 
                                                href={file.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="hover:underline"
                                            >
                                                {file.name}
                                            </a>
                                        )}
                                        <Link to={`/edit/${note.id}/${index}`} className="ml-2 text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Comments Section */}
                            <div>
                                <input
                                    type="text"
                                    value={comments[note.id] || ''}
                                    onChange={(e) => handleCommentChange(note.id, e)}
                                    placeholder="Add a comment..."
                                />
                                <button onClick={() => addComment(note.id)} className="ml-2 text-blue-500 hover:underline">
                                    Submit
                                </button>
                            </div>
                            {note.comments && note.comments.length > 0 && (
                                <div>
                                    <h5>Comments:</h5>
                                    <ul>
                                        {note.comments.map((comment, index) => (
                                            <li key={index}>{comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button onClick={() => deleteNote(note.id)} className="mt-2 text-red-600 hover:underline">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div>
            <h2>Notes</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="mb-4 p-2 border rounded"
            />
            {renderNotes().length === 0 ? (
                <p>No notes available.</p>
            ) : (
                renderNotes()
            )}
        </div>
    );
};

export default NoteList;

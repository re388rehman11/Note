// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut as firebaseSignOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import React, { createContext, useContext, useState, useEffect } from "react";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC_0O52tg3aYwpnNF70782cKhO39HZuZ6g",
//   authDomain: "umar-4afb6.firebaseapp.com",
//   projectId: "umar-4afb6",
//   storageBucket: "umar-4afb6.appspot.com",
//   messagingSenderId: "957385819503",
//   appId: "1:957385819503:web:fe6d280c48850697a6149a",
// };

// // Initialize Firebase app
// const firebaseApp = initializeApp(firebaseConfig);

// // Initialize Firebase Auth and Firestore
// const firebaseAuth = getAuth(firebaseApp);
// const firestore = getFirestore(firebaseApp);
// const googleProvider = new GoogleAuthProvider();

// // Create Firebase context
// const FirebaseContext = createContext(null);

// // Custom hook for using Firebase context
// export const useFirebase = () => useContext(FirebaseContext);

// // Firebase Provider component
// export const FirebaseProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
//       setUser(user ? user : null);
//     });

//     return () => unsubscribe(); // Clean up subscription on unmount
//   }, []);

//   const signupUserWithEmailAndPassword = async (email, password) => {
//     try {
//       // Firebase's createUserWithEmailAndPassword function registers a new user
//       const userCredential = await createUserWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );
//       return userCredential;
//     } catch (err) {
//       // Return the error code for more specific error handling
//       throw err;
//     }
//   };

//   const signinUserWithEmailAndPass = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(firebaseAuth, email, password);
//       return { success: true }; // Login was successful
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message }; // Login failed
//     }
//   };

//   const signinWithGoogle = async () => {
//     try {
//       await signInWithPopup(firebaseAuth, googleProvider);
//       return { success: true }; // Indicate success
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message }; // Return error
//     }
//   };

//   const resetPassword = async (email) => {
//     try {
//       await sendPasswordResetEmail(firebaseAuth, email);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const signOut = async () => {
//     try {
//       await firebaseSignOut(firebaseAuth);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const isLoggedIn = !!user; // Boolean indicating if the user is logged in

//   return (
//     <FirebaseContext.Provider
//       value={{
//         signupUserWithEmailAndPassword,
//         signinUserWithEmailAndPass,
//         signinWithGoogle,
//         resetPassword,
//         signOut,
//         isLoggedIn,
//         user,
//         error, // Expose error messages
//         firestore,
//         collection,
//         addDoc,
//         getDocs,
//       }}
//     >
//       {children}
//     </FirebaseContext.Provider>
//   );
// };





import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_0O52tg3aYwpnNF70782cKhO39HZuZ6g",
  authDomain: "umar-4afb6.firebaseapp.com",
  projectId: "umar-4afb6",
  storageBucket: "umar-4afb6.appspot.com",
  messagingSenderId: "957385819503",
  appId: "1:957385819503:web:fe6d280c48850697a6149a",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create Firebase context
const FirebaseContext = createContext(null);

// Custom hook for using Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw for handling in the calling component
    }
  };

  const signinUserWithEmailAndPass = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return { success: true }; // Login was successful
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message }; // Login failed
    }
  };

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      return { success: true }; // Indicate success
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message }; // Return error
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      setError(err.message);
    }
  };

  const isLoggedIn = !!user; // Boolean indicating if the user is logged in

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        signinWithGoogle,
        resetPassword,
        signOut,
        isLoggedIn,
        user,
        error, // Expose error messages
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

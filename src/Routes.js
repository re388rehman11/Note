import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


//import { BarLoader } from 'react-spinners';
import Components from './components'
import Pages from './pages';
import NoteList from './NoteList';





export default function Index() {
  return (
    <BrowserRouter>


      <Routes>
    
        <Route path="/*" element={<Components/>} />
        <Route path="/pages/*" element={<Pages />} />
        <Route path="/NoteList/*" element={<NoteList/>} />

       

      </Routes>
    

    </BrowserRouter>
  )
}
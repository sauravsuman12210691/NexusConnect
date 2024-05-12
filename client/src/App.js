// import { useState } from 'react'
import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Profile from './Components/Profile.jsx';
import SignUP from './Components/SignUP.jsx';
import Login from  './Components/Login.jsx';
import NoteState from './context/notes/NoteState.js';

function App() {
  // const [count, setCount] = useState(0)

  return (
   <NoteState>
   <BrowserRouter>
   <Routes>
    <Route path='/profile' element={<Profile />}></Route>
    <Route path='/register' element={<SignUP/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
   </BrowserRouter>
  </NoteState>
  )
}

export default App

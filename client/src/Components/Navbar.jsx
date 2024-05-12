import React, { Component, useState } from 'react'
import './Navbar.css'
import { useNavigate} from 'react-router-dom';

function Navbar(){
  // const [isDark,setMood] = useState(true);
  const navigate = useNavigate();
  const logOut = ()=>{
    navigate('/register')
    localStorage.removeItem('awthToken');

  }
  
  
  return(
      <div className='flex nav'>
        <ul className='flex left'>
            <li id='logo'>NexusConnect</li>
            <li><input id='search' type="text" placeholder="Search..." /></li>
            
        </ul>
        <ul className='flex right'>
          <li ><span className="material-symbols-outlined">
dark_mode
</span></li>
          <li><span className="material-symbols-outlined">
mark_chat_unread
</span></li>
          <li><span className="material-symbols-outlined">
notifications
</span></li>
          <li>?</li>
          <li onClick={logOut}><span className="material-symbols-outlined ">
logout
</span></li>
        </ul>
      </div>
    )
  }
export default Navbar

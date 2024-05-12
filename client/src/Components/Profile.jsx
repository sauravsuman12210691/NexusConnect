
import { useEffect } from 'react'
import Navbar from './Navbar'
import PostCompo from './Post/PostCompo'
import PostUpdate from './PostUpdate/PostUpdate'
import './Profile.css'
import ProfileCard from './ProfileCard'
import { useNavigate} from 'react-router-dom';

// import React, { useState, useEffect } from "react";

function Profile () {
 useEffect(()=>{
  
 },[])
   const navigate= useNavigate();
 if(localStorage.getItem('awthToken') === null) {
   navigate('/register')
   window.location = '/login';
}
  return(
    <div className=''>
     <Navbar/>
      
      <ProfileCard/>
      <PostUpdate/>
      
       <PostCompo/>
     
      </div>
  
      

  )
  
}

export default Profile;


import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from 'react';
import './ProfileCard.css';
import img1 from './img1.jpg';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

// import { useEffect } from 'react';
function ProfileCard() {
  const navigate = useNavigate();
  const a = useContext(noteContext);
  const [profileImg, setProfile] = useState(img1);
  const [userName, setuserName] = useState('Unkown');
  const [noOfFriends, setnoOfFriends] = useState('0');
  const [location, setLocation] = useState('fakeLocation');
  const [ocupation, setOcupation] = useState('fakeOcu');



  // Add code for registration logic

  useEffect(() => {
    if (a == null) {
      navigate('/register')
    } else {
      setuserName(a.name)
      setOcupation(a.email)
      console.log(a)
    }

  })



  return (
    <div className='card'>
      <div className="img">
        <img id='profileImg' src={profileImg} alt="img" />
        <span><h3>{userName}</h3>
          <h5>{noOfFriends} Friends</h5></span>
      </div>
      <div className="personalDetails">
        <li><span className="material-symbols-outlined">
          location_on
        </span>{location}</li>
        <li><span className="material-symbols-outlined">
          business_center
        </span>{ocupation}</li>
      </div>
      <button type="button" class="btn btn-outline-info mt-4">EDIT PROFILE</button>
    </div>
  )
}
export default ProfileCard;

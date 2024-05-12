import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

import './SignUP.css'
function SignUP(){
     const history= useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
console.log(name)
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleRegister = async(e) => {
        e.preventDefault();
        // Add code for registration logic
        try{
            const res= await fetch("http://localhost:5000/api/auth/createUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,email,password
                })
            });
            const data=await res.json();
            if(res.status!=400){
                alert("succefully registered");
                
            }else{
alert(data.error);
            }

            }
            catch(e){
                    console.log(e);
        
                }
       
        // console.log('Registering...');
    
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // Add code for login logic
        console.log('Logging in...');
    };
    return(
       



<div className='outerBox1'>
  <div className="title1">
    <h1 id='title1'>NexusConnect</h1>
    <h3 className='white'>NexusConnect helps you connect.</h3>
  </div>
  <div className="form1 flex1 justify-center1 items-center1 h-screen1">
    <form action='POST'>
      <input type="text" id="name" placeholder='User Name' name="name" value={name} onChange={handleNameChange} required />
      <br /><br />
      <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder='Email Address' required /><br /><br />
      <input type="password" id="password" placeholder='Password' name="password" value={password} onChange={handlePasswordChange} required /><br /><br />
      <button className='registerBtn' onClick={handleRegister}> Register</button>
      <br />
      <p id='red'>Or already have an account</p>
      <Link to={'/login'}   ><button id='btn1' >Login</button></Link>
    </form>
  </div>
</div>
    )
}
 export default SignUP;

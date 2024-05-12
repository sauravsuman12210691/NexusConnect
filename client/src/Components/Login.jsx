import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Login.css';
// import AppCss from '../App.css';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        console.log(data)
        if (data.success === false) {
            alert("Please enter the correct credentials")
        }
        else {
            localStorage.setItem('awthToken', data.awthToken)
            localStorage.setItem('is_valid', data.success)
            alert("Login successfull");
            console.log("Login successfull");
            //Save the auth token and redirect
            navigate('/profile');
        }
    };
    return (
        <div className='outerBox'>
            <div className="title">
                <h1 id='title'>NexusConnect</h1>
                <h3>NexusConnect helps you connect.</h3>
            </div>
            <div className="form flex justify-center items-center h-screen">
                <form onSubmit={handleLogin}>

                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder='Email Address' required /><br /><br />



                    <input type="password" id="password" placeholder='Password' name="password" value={password} onChange={handlePasswordChange} required /><br /><br />

                    <button id='btn'>Login</button>
                </form>
            </div>
        </div>
    )


}
export default Login;

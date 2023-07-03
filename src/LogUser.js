import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function LogUser (props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const localstorageGetInformation=localStorage.getItem('isLoggedIn')
  
    // logs the user in if the username and the pass are not empty
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            localStorage.setItem("isLoggedIn",'1');
            localStorage.setItem("username", username);
            setIsLoggedIn(true);
            props.logged(true);
            navigate('/home');
        }
    }
    // saves the user's status in localStorage
    useEffect(()=>{
        if(localstorageGetInformation === '1'){
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn",'1');
          console.log(isLoggedIn);
        }
      },[])

    return (
        <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>

                <h2>Login</h2>
                
                <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usename" id="username" name="username" />
                     
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" name="password" />

                <button className="login-btn" type="submit">Log In</button>
            </form>
        </div>
    )
}
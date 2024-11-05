// src/components/SignUp.js
import React, { useState } from 'react';
import config from '../config';

//sign up funciton
function SignUp() 
{
    //sets contstants
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    //handles submission
    const handleSubmit = async (e) => 
    {
        //getches info from api/register
        e.preventDefault();
        const response = await fetch(`${config.backendUrl}/api/register`, 
            {
            //method post
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password, name }),
        });
        const data = await response.json();
        console.log(data.message);
    };

    return 
    (
        //form for submission
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;

// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

//sign in function
function SignIn() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //sets navigate to the hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => 
        {
        e.preventDefault();
        try 
        {
            const response = await fetch(`${config.backendUrl}/api/login`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, password }),
            });

            if (response.ok) 
            {
                const data = await response.json();
                setMessage('Login successful');
                console.log(data);

                // Redirect to the list of posts after a successful login
                navigate('/');
            } 
            else 
            {
                setMessage('Invalid credentials');
            }
        } 
        catch (error) 
        {
            console.error('Login error:', error);
            setMessage('Login failed');
        }
    };

return (
    <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);return (
    <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);return (
    <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);return (
    <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);

return (
    <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);

}

export default SignIn;

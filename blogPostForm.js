// src/components/BlogPostForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function BlogPostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.backendUrl}/api/posts`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //include credentials
                credentials: 'include', 
                body: JSON.stringify({ title, body }),
            });

            if (response.ok) {
                setMessage("Post created successfully!");
                navigate("/"); // Redirect to main page upon success
            } else {
                setMessage("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setMessage("An error occurred while creating the post.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
}

export default BlogPostForm;

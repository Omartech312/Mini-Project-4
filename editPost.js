// src/components/EditPost.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../config';

function EditPost() {
    //contants
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

useEffect(() => {
    async function fetchPost() 
    {
        try 
        {
            const response = await fetch(`${config.backendUrl}/api/posts/${id}`);
            if (!response.ok) 
            {
                throw new Error('Post not found');
            }
            const data = await response.json();
            setTitle(data.title);
            setBody(data.body);
        } 
        catch (error) 
        {
            console.error("Error fetching post:", error);
            setMessage("Could not load the post.");
        }
    }
    fetchPost();
}, [id]);

    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        //checsk that the info from post is nto empty
        if (!title || !body) 
        {
            setMessage("Title and body cannot be empty");
            return;
        }

        try 
        {
            const response = await fetch(`${config.backendUrl}/api/posts/${id}`, 
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                //stores the content of the post as body
                body: JSON.stringify({ title, body }),
            });

            //if the post is edited correctly then displays this and goes back to the main page
            if (response.ok) 
            {
                setMessage('Post updated successfully');
                navigate('/');
            } 
            //otherwise displays the faulre message
            else 
            {
                setMessage('Failed to update the post');
            }
        } 
        catch (error) 
        {
            console.error("Error updating post:", error);
            setMessage("Error occurred while updating the post.");
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={body} // Updated to use 'body'
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}

export default EditPost;

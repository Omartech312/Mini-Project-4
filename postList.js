// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';

function PostList() {
    //constants
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch posts
        async function fetchPosts() 
        {
            try 
            {
                const response = await fetch(`${config.backendUrl}/api/posts`);
                const data = await response.json();
                //sets the posts using the array
                setPosts(data.blogs);
            } 
            catch (error) 
            {
                console.error("Error fetching posts:", error);
            }
        }

        // Fetch logged-in user info
        async function fetchUser() 
        {
            try 
            {
                const response = await fetch(`${config.backendUrl}/api/user`, 
                {
                    //includes session
                    credentials: 'include',
                });
                if (response.ok) 
                {
                    const userData = await response.json();
                    //gets the current log in user
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        //fetches teh posts and user info
        fetchPosts();
        fetchUser();
    }, []);

    const handleDelete = async (id) => 
    {
        try 
        {
            await fetch(`${config.backendUrl}/api/posts/${id}`, 
            {
                //method in case user wants to delete
                method: 'DELETE',
                credentials: 'include',
            });
            setPosts(posts.filter(post => post.blog_id !== id));
        } 
        catch (error) 
        {
            console.error("Error deleting post:", error);
        }
    };

    const handleSignOut = () => 
    {
        fetch(`${config.backendUrl}/api/logout`, 
        {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            setUser(null);
            navigate('/');
        }).catch(error => console.error("Error signing out:", error));
    };

    return (
        <div>
            <h2>Blog Posts</h2>

            {/* Sign In/Sign Out and Create Post buttons */}
            <div style={{ marginBottom: '20px' }}>
                {user ? (
                    <>
                        <button onClick={handleSignOut}>Sign Out</button>
                        <button onClick={() => navigate('/create')}>Create New Post</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/signin')}>Sign In</button>
                        <button onClick={() => navigate('/signup')}>Sign Up</button>
                    </>
                )}
            </div>

            {/* Display each post */}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.blog_id} style={{ marginBottom: '20px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>

                        {/* Show Edit and Delete buttons only if the logged-in user created the post */}
                        {user && user.user_id === post.creator_user_id && (
                            <div>
                                <Link to={`/edit/${post.blog_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(post.blog_id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

export default PostList;

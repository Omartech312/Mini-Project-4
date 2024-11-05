// index.js
const express = require('express');
const router = express.Router();
const pool = require('./main').pool;

// Route to fetch all posts
router.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT blog_id, title, body, creator_user_id FROM blogs`
        );
        res.json({ blogs: result.rows });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get the current user's information
router.get('/api/user', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
});

// Route to log in user
router.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE name = $1 AND password = $2',
            [name, password]
        );
        if (result.rows.length > 0) {
            req.session.user = result.rows[0];
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to log out user
router.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;

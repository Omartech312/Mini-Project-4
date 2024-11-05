const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
const cors = require('cors');
const app = express();
const Pool = pg.Pool;

const pool = new Pool({
    user: 'sergior',
    host: 'localhost',
    database: 'BlogDB',
    password: 'password132',
    port: 5432,
});

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/api/login', async (req, res) => {
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

app.get('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            `SELECT blogs.blog_id, blogs.title, blogs.body, blogs.creator_user_id, users.name AS creator_name
             FROM blogs
             JOIN users ON blogs.creator_user_id = users.user_id
             WHERE blogs.blog_id = $1`,
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT blogs.blog_id, blogs.title, blogs.body, blogs.creator_user_id, users.name AS creator_name
             FROM blogs
             JOIN users ON blogs.creator_user_id = users.user_id`
        );
        res.json({ blogs: result.rows });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/user', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

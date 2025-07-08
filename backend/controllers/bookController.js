const pool = require('../db');

// GET /api/books
exports.getBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};


// POST /api/books
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre, total_pages, cover_url } = req.body;

        const result = await pool.query(
            'INSERT INTO books (title, author, genre, total_pages, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, genre, total_pages, cover_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add book' });
    }
};

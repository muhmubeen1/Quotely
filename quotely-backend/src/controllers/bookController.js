const { pool } = require('../config/database');

// GET /api/books - List all books for user
const getBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            `SELECT b.*, COUNT(q.id) as quotes_count
       FROM books b
       LEFT JOIN quotes q ON b.id = q.book_id
       WHERE b.user_id = $1
       GROUP BY b.id
       ORDER BY b.created_at DESC
       LIMIT $2 OFFSET $3`,
            [req.user.id, limit, offset]
        );

        const countResult = await pool.query(
            'SELECT COUNT(*) FROM books WHERE user_id = $1',
            [req.user.id]
        );

        res.json({
            books: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(countResult.rows[0].count)
            }
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/books - Create new book
// POST /api/books - Create new book
const createBook = async (req, res, next) => {
    try {
        const {
            title,
            author,
            totalPages = 0,
            genre = null,
            status = 'want_to_read',
            targetCompletionDays = null
        } = req.body;

        const result = await pool.query(
            `INSERT INTO books (user_id, title, author, total_pages, genre, status, target_completion_days) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [req.user.id, title, author, totalPages, genre, status, targetCompletionDays]
        );

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            book: result.rows[0]
        });

    } catch (error) {
        console.error('Create Book Error:', error);
        next(error);
    }
};
// PUT /api/books/:id - Update book
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;

        // Verify ownership
        const check = await pool.query(
            'SELECT id FROM books WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        if (check.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found or unauthorized' });
        }

        const result = await pool.query(
            `UPDATE books SET title = $1, author = $2 
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
            [title, author, id, req.user.id]
        );

        res.json({
            message: 'Book updated successfully',
            book: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/books/:id - Delete book
const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING id',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found or unauthorized' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};


// GET /api/books/:id - Get single book with quotes
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT b.*, 
        COALESCE(json_agg(
          json_build_object(
            'id', q.id,
            'content', q.content,
            'page_number', q.page_number,
            'tags', q.tags,
            'is_favorite', q.is_favorite,
            'created_at', q.created_at
          ) ORDER BY q.created_at DESC
        ) FILTER (WHERE q.id IS NOT NULL), '[]') as quotes
       FROM books b
       LEFT JOIN quotes q ON b.id = q.book_id
       WHERE b.id = $1 AND b.user_id = $2
       GROUP BY b.id`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ book: result.rows[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById
};
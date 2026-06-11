const { pool } = require('../config/database');

// GET /api/quotes - List quotes with filters
const getQuotes = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, book_id, tag, search, is_favorite } = req.query;
        const offset = (page - 1) * limit;

        let whereClause = 'WHERE q.user_id = $1';
        const params = [req.user.id];
        let paramIndex = 1;

        if (book_id) {
            paramIndex++;
            whereClause += ` AND q.book_id = $${paramIndex}`;
            params.push(book_id);
        }

        if (tag) {
            paramIndex++;
            whereClause += ` AND $${paramIndex} = ANY(q.tags)`;
            params.push(tag);
        }

        if (search) {
            paramIndex++;
            whereClause += ` AND q.content ILIKE $${paramIndex}`;
            params.push(`%${search}%`);
        }

        if (is_favorite === 'true') {
            paramIndex++;
            whereClause += ` AND q.is_favorite = $${paramIndex}`;
            params.push(true);
        }

        const queryParams = [...params, limit, offset];

        const result = await pool.query(
            `SELECT q.*, b.title as book_title, b.author as book_author
       FROM quotes q
       JOIN books b ON q.book_id = b.id
       ${whereClause}
       ORDER BY q.created_at DESC
       LIMIT $${paramIndex + 1} OFFSET $${paramIndex + 2}`,
            queryParams
        );

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM quotes q ${whereClause}`,
            params
        );

        res.json({
            quotes: result.rows,
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

// POST /api/quotes - Create quote
const createQuote = async (req, res, next) => {
    try {
        const { book_id, content, page_number, tags = [] } = req.body;

        // Verify book ownership
        const bookCheck = await pool.query(
            'SELECT id FROM books WHERE id = $1 AND user_id = $2',
            [book_id, req.user.id]
        );

        if (bookCheck.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found or unauthorized' });
        }

        const result = await pool.query(
            `INSERT INTO quotes (user_id, book_id, content, page_number, tags) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
            [req.user.id, book_id, content, page_number, tags]
        );

        res.status(201).json({
            message: 'Quote created successfully',
            quote: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/quotes/:id - Update quote
const updateQuote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content, page_number, tags, is_favorite } = req.body;

        const result = await pool.query(
            `UPDATE quotes 
       SET content = COALESCE($1, content),
           page_number = COALESCE($2, page_number),
           tags = COALESCE($3, tags),
           is_favorite = COALESCE($4, is_favorite)
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
            [content, page_number, tags, is_favorite, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Quote not found or unauthorized' });
        }

        res.json({
            message: 'Quote updated successfully',
            quote: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/quotes/:id - Delete quote
const deleteQuote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM quotes WHERE id = $1 AND user_id = $2 RETURNING id',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Quote not found or unauthorized' });
        }

        res.json({ message: 'Quote deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// GET /api/quotes/favorites - Get favorite quotes
const getFavorites = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            `SELECT q.*, b.title as book_title, b.author as book_author
       FROM quotes q
       JOIN books b ON q.book_id = b.id
       WHERE q.user_id = $1 AND q.is_favorite = true
       ORDER BY q.created_at DESC
       LIMIT $2 OFFSET $3`,
            [req.user.id, limit, offset]
        );

        res.json({ quotes: result.rows });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/quotes/:id/favorite - Toggle favorite
const toggleFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE quotes 
       SET is_favorite = NOT is_favorite
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Quote not found or unauthorized' });
        }

        res.json({
            message: 'Favorite status updated',
            quote: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getQuotes,
    createQuote,
    updateQuote,
    deleteQuote,
    getFavorites,
    toggleFavorite
};
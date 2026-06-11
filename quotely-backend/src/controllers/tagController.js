const { pool } = require('../config/database');

// GET /api/tags - List all tags with counts
const getTags = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT DISTINCT unnest(tags) as tag, COUNT(*) as count
       FROM quotes
       WHERE user_id = $1
       GROUP BY unnest(tags)
       ORDER BY count DESC`,
            [req.user.id]
        );

        res.json({ tags: result.rows });
    } catch (error) {
        next(error);
    }
};

// GET /api/tags/:tag/quotes - Get quotes by tag
const getQuotesByTag = async (req, res, next) => {
    try {
        const { tag } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query(
            `SELECT q.*, b.title as book_title, b.author as book_author
       FROM quotes q
       JOIN books b ON q.book_id = b.id
       WHERE q.user_id = $1 AND $2 = ANY(q.tags)
       ORDER BY q.created_at DESC
       LIMIT $3 OFFSET $4`,
            [req.user.id, tag, limit, offset]
        );

        res.json({ tag, quotes: result.rows });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTags, getQuotesByTag };
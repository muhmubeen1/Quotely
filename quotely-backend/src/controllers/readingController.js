const { pool } = require('../config/database');

// POST /api/reading/progress - Log daily reading
const logProgress = async (req, res, next) => {
    try {
        const { book_id, pages_read, minutes_spent, notes, reading_date } = req.body;
        const date = reading_date || new Date().toISOString().split('T')[0];

        // Update or insert progress
        const result = await pool.query(
            `INSERT INTO reading_progress (user_id, book_id, pages_read, minutes_spent, notes, reading_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, book_id, reading_date) 
       DO UPDATE SET pages_read = reading_progress.pages_read + $3,
                     minutes_spent = reading_progress.minutes_spent + $4,
                     notes = COALESCE($5, reading_progress.notes)
       RETURNING *`,
            [req.user.id, book_id, pages_read, minutes_spent, notes, date]
        );

        // Update reading streak
        await updateStreak(req.user.id, date);

        res.status(201).json({
            message: 'Progress logged successfully',
            progress: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/reading/progress - Get progress history
const getProgress = async (req, res, next) => {
    try {
        const { book_id, start_date, end_date } = req.query;

        let whereClause = 'WHERE user_id = $1';
        const params = [req.user.id];

        if (book_id) {
            params.push(book_id);
            whereClause += ` AND book_id = $${params.length}`;
        }

        if (start_date) {
            params.push(start_date);
            whereClause += ` AND reading_date >= $${params.length}`;
        }

        if (end_date) {
            params.push(end_date);
            whereClause += ` AND reading_date <= $${params.length}`;
        }

        const result = await pool.query(
            `SELECT rp.*, b.title as book_title, b.author as book_author
       FROM reading_progress rp
       JOIN books b ON rp.book_id = b.id
       ${whereClause}
       ORDER BY rp.reading_date DESC`,
            params
        );

        res.json({ progress: result.rows });
    } catch (error) {
        next(error);
    }
};

// GET /api/reading/stats - Get reading statistics
const getStats = async (req, res, next) => {
    try {
        const { period = 'month' } = req.query;

        let dateFilter;
        switch (period) {
            case 'week':
                dateFilter = "reading_date >= CURRENT_DATE - INTERVAL '7 days'";
                break;
            case 'month':
                dateFilter = "reading_date >= CURRENT_DATE - INTERVAL '30 days'";
                break;
            case 'year':
                dateFilter = "reading_date >= CURRENT_DATE - INTERVAL '1 year'";
                break;
            default:
                dateFilter = "1=1";
        }

        const statsResult = await pool.query(
            `SELECT 
        COALESCE(SUM(pages_read), 0) as total_pages,
        COALESCE(SUM(minutes_spent), 0) as total_minutes,
        COUNT(DISTINCT reading_date) as days_read,
        COUNT(DISTINCT book_id) as books_read
       FROM reading_progress
       WHERE user_id = $1 AND ${dateFilter}`,
            [req.user.id]
        );

        const dailyResult = await pool.query(
            `SELECT reading_date, SUM(pages_read) as pages, SUM(minutes_spent) as minutes
       FROM reading_progress
       WHERE user_id = $1 AND ${dateFilter}
       GROUP BY reading_date
       ORDER BY reading_date`,
            [req.user.id]
        );

        const streakResult = await pool.query(
            'SELECT * FROM reading_streaks WHERE user_id = $1',
            [req.user.id]
        );

        res.json({
            period,
            summary: statsResult.rows[0],
            daily_breakdown: dailyResult.rows,
            streak: streakResult.rows[0] || { current_streak: 0, longest_streak: 0 }
        });
    } catch (error) {
        next(error);
    }
};

// Helper: Update reading streak (simplified)
const updateStreak = async (userId, date) => {
    try {
        const existing = await pool.query(
            'SELECT * FROM reading_streaks WHERE user_id = $1',
            [userId]
        );

        if (existing.rows.length === 0) {
            await pool.query(
                `INSERT INTO reading_streaks (user_id, current_streak, longest_streak, last_read_date)
         VALUES ($1, 1, 1, $2)`,
                [userId, date]
            );
        } else {
            const streak = existing.rows[0];
            const lastDate = new Date(streak.last_read_date);
            const currentDate = new Date(date);
            const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

            let newStreak = streak.current_streak;
            if (diffDays === 1) {
                newStreak = streak.current_streak + 1;
            } else if (diffDays > 1) {
                newStreak = 1;
            }

            const longestStreak = Math.max(streak.longest_streak, newStreak);

            await pool.query(
                `UPDATE reading_streaks 
         SET current_streak = $1, 
             longest_streak = $2, 
             last_read_date = $3,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $4`,
                [newStreak, longestStreak, date, userId]
            );
        }
    } catch (error) {
        console.error('Streak update error:', error);
    }
};

// EXPORTS AT THE BOTTOM
module.exports = {
    logProgress,
    getProgress,
    getStats
};
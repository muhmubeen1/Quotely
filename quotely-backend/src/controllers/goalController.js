const { pool } = require('../config/database');

// POST /api/reading/goals - Create a reading goal
const createGoal = async (req, res, next) => {
    try {
        const { goal_type, target_value, target_period, start_date, end_date } = req.body;

        // Validate goal_type
        if (!['daily', 'monthly', 'yearly'].includes(goal_type)) {
            return res.status(400).json({ message: 'Invalid goal type. Use: daily, monthly, yearly' });
        }

        const result = await pool.query(
            `INSERT INTO reading_goals (user_id, goal_type, target_value, target_period, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [req.user.id, goal_type, target_value, target_period, start_date, end_date]
        );

        res.status(201).json({
            message: 'Goal created successfully',
            goal: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/reading/goals - Get all active goals with progress
const getGoals = async (req, res, next) => {
    try {
        // Get active goals
        const goalsResult = await pool.query(
            `SELECT * FROM reading_goals 
       WHERE user_id = $1 AND is_active = true
       ORDER BY created_at DESC`,
            [req.user.id]
        );

        // Calculate progress for each goal
        const goalsWithProgress = await Promise.all(
            goalsResult.rows.map(async (goal) => {
                let progressQuery;
                let params = [req.user.id];

                switch (goal.goal_type) {
                    case 'daily':
                        progressQuery = `SELECT COALESCE(SUM(pages_read), 0) as current 
                             FROM reading_progress 
                             WHERE user_id = $1 AND reading_date = CURRENT_DATE`;
                        break;
                    case 'monthly':
                        progressQuery = `SELECT COALESCE(SUM(pages_read), 0) as current,
                             COUNT(DISTINCT book_id) as books_count
                             FROM reading_progress 
                             WHERE user_id = $1 
                             AND reading_date >= DATE_TRUNC('month', CURRENT_DATE)`;
                        break;
                    case 'yearly':
                        progressQuery = `SELECT COALESCE(SUM(pages_read), 0) as current,
                             COUNT(DISTINCT book_id) as books_count
                             FROM reading_progress 
                             WHERE user_id = $1 
                             AND reading_date >= DATE_TRUNC('year', CURRENT_DATE)`;
                        break;
                }

                const progressResult = await pool.query(progressQuery, params);
                const current = goal.target_period === 'books'
                    ? progressResult.rows[0].books_count
                    : progressResult.rows[0].current;

                return {
                    ...goal,
                    progress: {
                        current: parseInt(current),
                        target: goal.target_value,
                        percentage: Math.round((current / goal.target_value) * 100),
                        remaining: Math.max(0, goal.target_value - current)
                    }
                };
            })
        );

        res.json({ goals: goalsWithProgress });
    } catch (error) {
        next(error);
    }
};

// PUT /api/reading/goals/:id - Update goal
const updateGoal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { target_value, is_active } = req.body;

        const result = await pool.query(
            `UPDATE reading_goals 
       SET target_value = COALESCE($1, target_value),
           is_active = COALESCE($2, is_active)
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
            [target_value, is_active, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({
            message: 'Goal updated successfully',
            goal: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/reading/goals/:id - Delete goal
const deleteGoal = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM reading_goals WHERE id = $1 AND user_id = $2 RETURNING id',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// GET /api/reading/dashboard - Get complete dashboard data
// GET /api/reading/dashboard - Get complete dashboard data
// GET /api/reading/dashboard - Get complete dashboard data
const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 1. Core Stats
        const statsResult = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM books WHERE user_id = $1)::int as total_books,
                (SELECT COUNT(*) FROM quotes WHERE user_id = $1)::int as total_quotes,
                (SELECT COUNT(*) FROM quotes WHERE user_id = $1 AND is_favorite = true)::int as total_favorites,
                COALESCE((SELECT current_streak FROM reading_streaks WHERE user_id = $1), 0) as current_streak
        `, [userId]);

        const stats = statsResult.rows[0];

        // 2. Recent Quotes (with book info)
        const recentQuotesResult = await pool.query(`
            SELECT 
                q.id,
                q.content,
                q.page_number,
                q.tags,
                q.is_favorite,
                q.created_at,
                b.id as book_id,
                b.title as book_title,
                b.author as book_author
            FROM quotes q
            JOIN books b ON q.book_id = b.id
            WHERE q.user_id = $1
            ORDER BY q.created_at DESC
            LIMIT 5
        `, [userId]);

        // 3. Recent Books (without cover column)
        const recentBooksResult = await pool.query(`
            SELECT 
                b.id,
                b.title,
                b.author,
                COUNT(q.id) as total_quotes
            FROM books b
            LEFT JOIN quotes q ON b.id = q.book_id
            WHERE b.user_id = $1
            GROUP BY b.id, b.title, b.author
            ORDER BY b.created_at DESC
            LIMIT 4
        `, [userId]);

        res.json({
            success: true,
            stats: {
                totalBooks: stats.total_books || 0,
                totalQuotes: stats.total_quotes || 0,
                totalFavorites: stats.total_favorites || 0,
                currentStreak: stats.current_streak || 0,
            },
            recentQuotes: recentQuotesResult.rows,
            recentBooks: recentBooksResult.rows,
            streak: {
                current: stats.current_streak || 0,
                longest: 0
            }
        });

    } catch (error) {
        console.error('Dashboard Error:', error);
        next(error);
    }
};

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    getDashboard
};
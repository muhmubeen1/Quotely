const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Import controllers
const {
    logProgress,
    getProgress,
    getStats
} = require('../controllers/readingController');

const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    getDashboard
} = require('../controllers/goalController');

router.use(authenticate);

// Progress routes
router.post('/progress', [
    body('book_id').isInt(),
    body('pages_read').isInt({ min: 0 }),
    body('minutes_spent').optional().isInt({ min: 0 }),
    body('notes').optional().trim(),
    body('reading_date').optional().isDate()
], logProgress);

router.get('/progress', getProgress);
router.get('/stats', getStats);

// Goals routes
router.post('/goals', [
    body('goal_type').isIn(['daily', 'monthly', 'yearly']),
    body('target_value').isInt({ min: 1 }),
    body('target_period').isIn(['pages', 'books', 'minutes']),
    body('start_date').isDate(),
    body('end_date').optional().isDate()
], createGoal);

router.get('/goals', getGoals);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

// Dashboard
router.get('/dashboard', getDashboard);

module.exports = router;
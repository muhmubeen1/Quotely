const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// ⏳ Placeholder for future Stripe integration
// All routes return "coming soon" for now

router.get('/status', authenticate, (req, res) => {
    res.json({
        status: 'free',
        plan: 'free',
        message: 'Subscription feature coming soon',
        features: {
            canExport: false,
            maxBooks: 10,
            maxQuotesPerBook: 50
        }
    });
});

// Placeholder checkout route
router.post('/checkout', authenticate, (req, res) => {
    res.status(503).json({
        error: 'Stripe integration not implemented yet',
        status: '⏳ Coming soon'
    });
});

module.exports = router;
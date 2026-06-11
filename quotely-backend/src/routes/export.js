const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { checkPremium } = require('../middleware/premium');
const { exportToPDF, exportToTXT } = require('../controllers/exportController');

// All export routes require authentication AND premium subscription
router.use(authenticate);
router.use(checkPremium);

// Export endpoints
router.get('/pdf', exportToPDF);
router.get('/txt', exportToTXT);

module.exports = router;
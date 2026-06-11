const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getTags, getQuotesByTag } = require('../controllers/tagController');

router.use(authenticate);

router.get('/', getTags);
router.get('/:tag/quotes', getQuotesByTag);

module.exports = router;

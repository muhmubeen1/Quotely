const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
    getQuotes,
    createQuote,
    updateQuote,
    deleteQuote,
    getFavorites,
    toggleFavorite
} = require('../controllers/quoteController');

router.use(authenticate);

router.get('/', getQuotes);
router.get('/favorites', getFavorites);
router.post('/', [
    body('book_id').isInt(),
    body('content').trim().notEmpty(),
    body('page_number').optional().isInt(),
    body('tags').optional().isArray()
], createQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);
router.patch('/:id/favorite', toggleFavorite);

module.exports = router;
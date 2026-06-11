const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById
} = require('../controllers/bookController');

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/', getBooks);
router.post('/', [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required')
], createBook);
router.get('/:id', getBookById);
router.put('/:id', [
    body('title').optional().trim().notEmpty(),
    body('author').optional().trim().notEmpty()
], updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
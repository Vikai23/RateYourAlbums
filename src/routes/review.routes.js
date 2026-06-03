const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', ReviewController.index);

router.post('/', authMiddleware, ReviewController.store);
router.put('/:id', authMiddleware, ReviewController.update);
router.delete('/:id', authMiddleware, ReviewController.destroy);

module.exports = router;
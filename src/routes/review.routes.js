const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

router.get('/', ReviewController.index);

const authMiddleware = require('../middlewares/auth.middleware');
router.post('/', authMiddleware, ReviewController.store);

module.exports = router;
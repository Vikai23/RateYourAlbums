const express = require('express');
const router = express.Router();

const TrackController = require('../controllers/track.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', TrackController.index);

router.post('/', authMiddleware, TrackController.store);
router.put('/:id', authMiddleware, TrackController.update);
router.delete('/:id', authMiddleware, TrackController.destroy);

module.exports = router;
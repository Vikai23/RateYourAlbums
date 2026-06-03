const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', AlbumController.index);
router.get('/:id', AlbumController.show);

router.post('/', authMiddleware, AlbumController.store);
router.put('/:id', authMiddleware, AlbumController.update);
router.delete('/:id', authMiddleware, AlbumController.destroy);

module.exports = router;
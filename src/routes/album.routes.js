const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album.controller');


const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', AlbumController.index);
router.post('/', authMiddleware, AlbumController.store);
router.get('/:id', AlbumController.show);

module.exports = router;
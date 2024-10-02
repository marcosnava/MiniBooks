const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, publicacaoController.create);
router.patch('/', checkAuth, publicacaoController.update);
router.delete('/', checkAuth, publicacaoController.delete);
router.get('/:id', checkAuth, publicacaoController.getOne);
router.get('/', checkAuth, publicacaoController.getAll);

module.exports = router;
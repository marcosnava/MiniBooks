const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.create);
router.patch('/', usuarioController.update);
router.delete('/', usuarioController.delete);
router.get('/:id', usuarioController.getOne);
router.get('/', usuarioController.getAll);

module.exports = router;
/*
* É neste arquivo que definimos as rotas.
* Veja que em app.js a rota é ativada em /usuarios
* portanto aqui tudo fica prefixado com este valor. Por exemplo?
* /usuarios/:id
*/
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.create);
router.patch('/', usuarioController.update);
router.delete('/', usuarioController.delete);
router.get('/:id', usuarioController.getOne);
router.get('/', usuarioController.getAll);

module.exports = router;
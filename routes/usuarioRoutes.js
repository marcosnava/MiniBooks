/*
* É neste arquivo que definimos as rotas.
* Veja que em app.js a rota é ativada em /usuarios
* portanto aqui tudo fica prefixado com este valor. Por exemplo?
* /usuarios/:id
*/
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const checkAuth = require('../middleware/checkAuth');

router.post('/login', usuarioController.login);
router.post('/', usuarioController.create);
router.patch('/', checkAuth, usuarioController.update);
router.delete('/', checkAuth, usuarioController.delete);
router.get('/:id', checkAuth, usuarioController.getOne);
router.get('/', checkAuth, usuarioController.getAll);

module.exports = router;
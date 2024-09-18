/*
* Neste arquivo criamos uma espécie de schema padrão para o nosso
* arquivo. Lembre-se que o mongo não usa schema, mas é útil você
* padronizar pelo menos uma parte dele.
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Usuario = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    senha: {
        type: String,
        require: true
    }
});

Usuario.plugin(uniqueValidator);

module.exports = mongoose.model('Usuarios', Usuario);
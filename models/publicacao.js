const mongoose = require('mongoose');

const Publicacao = mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    criador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    }
});

module.exports = mongoose.model('Publicacoes', Publicacao);
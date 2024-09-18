const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Importar as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const usuario = require('./models/usuario');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexão com o banco
mongoose.connect('mongodb://localhost:27017', {dbName: 'MiniBooks'})
   .then(() => {
    console.log('Conectado com sucesso!');
   })
   .catch(() => {
    console.log('Falha na conexão')
   })

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Implantação das rotas
app.use('/usuarios', usuarioRoutes);

module.exports = app;

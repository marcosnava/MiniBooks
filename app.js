/*
 * Este é um projeto simples de exemplo com uso
 * do NodeJs e do mongoDB.
 * Usaremos a tecnologia REST para isso
 * O projeto usa o express para facilitar o desenvolvimento
 * e o mongoose como "driver" de acesso ao banco.
 * Existe uma alternativa de usar diretamente o driver oficial,
 * mas é bem mais complicado.
*/

const express = require('express');
const mongoose = require('mongoose'); // driver para acesso ao banco

const app = express();

// Importar as rotas - Rotas são endereços que ligam a API ao
// usuário.
const usuarioRoutes = require('./routes/usuarioRoutes');
const usuario = require('./models/usuario');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexão com o banco - Se o seu banco tem senha use assim:
// mongoose.connect('mongodb://localhost:27017', {dbName: 'MiniBooks', user: 'nome', pass: 'senha'})
mongoose.connect('mongodb://localhost:27017', {dbName: 'MiniBooks'})
   .then(() => {
    console.log('Conectado com sucesso!');
   })
   .catch(() => {
    console.log('Falha na conexão')
   })

// CORS - é usado para liberar o acesso ao sistema para a web
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

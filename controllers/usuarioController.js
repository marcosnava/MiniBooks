/*
* O controller é o maestro do sistema. Ele faz todas as
* operações necessárias para o sistema trabalhar.
* Neste controller específico ele faz as operações de Usuários.
*/

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Usuario = require('../models/usuario');

exports.create = (req, res, next) => {
    const email = req.body.email; // recebe os dados do cliente
    const senha = req.body.senha;

    if(email === undefined || senha === undefined) // verifica se vieram certinho
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        const senhaCriptografada = bcrypt.hashSync(senha, 10); // Criptografa a senha

        // Verifica se o usuário já existe
        Usuario.findOne({
            email: email
        }).then(usuario => {
            if(usuario == undefined)
            {
                // se não existe cadastra
                const novoUsuario = new Usuario({
                    email: email,
                    senha: senhaCriptografada
                });

                novoUsuario.save().then(usuarioCriado => {
                    // Devolve ao usuário os dados cadastrados
                    // Note que a senha não.
                    res.status(201).json({
                        mensagem: 'Usuario criado',
                        usuario: {
                            id: usuarioCriado._id,
                            email: usuarioCriado.email
                        }
                    });
                })
            }
            else
            {
                // se existe dá erro
                res.status(401).json({
                    mensagem: 'Usuário já existe'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        })
    }
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email; 
    const senha = req.body.senha;

    if(id === undefined || email === undefined || senha === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        const senhaCriptografada = bcrypt.hashSync(senha, 10);

        const usuarioAlterado = new Usuario({
            _id: id,
            email: email,
            senha: senhaCriptografada
        });

        Usuario.updateOne({
            _id: id
        }, usuarioAlterado).then(resultado => {
            if(resultado.matchedCount > 0)
            {
                res.status(200).json({
                    mensagem: 'Usuário alterado'
                });
            }
            else
            {
                res.status(401).json({
                    mensagem: 'Não autorizado'
                })
            }
        })
    }
}

exports.delete = (req, res, next) => {
    const id = req.body.id;

    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        Usuario.deleteOne({
            _id: id
        }).then(resultado => {
            if(resultado.acknowledged)
            {
                res.status(200).json({
                    mensagem: 'Usuário excluído'
                });
            }
            else
            {
                res.status(401).json({
                    mensagem: 'Não autorizado'
                })
            }
        });
    }
}

exports.getOne = (req, res, next) => {
    const id = req.params.id; // no caso do get os dados vêm via URL, portando muda a maneira de pegar a informação

    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        Usuario.findOne({
            _id: id
        }).then(usuario => {
            if(usuario)
            {
                res.status(200).json({
                    mensagem: 'Usuário encontrado',
                    usuario: {
                        id: usuario._id,
                        email: usuario.email
                    }
                });
            }
            else
            {
                res.status(404).json({
                    mensagem: 'Usuário não encontrado'
                });
            }
        });
    }
}

exports.getAll = (req, res, next) => {
    Usuario.find().then(usuarios => {
        const usuariosSemSenha = usuarios.map(usr => {
            return {
                id: usr._id,
                email: usr.email
            }
        });

        res.status(200).json({
            mensagem: 'Usuários encontrados',
            usuarios: usuariosSemSenha
        });
    })
}

exports.login = (req, res, next) => {}
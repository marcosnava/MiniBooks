const jwt = require('jsonwebtoken');

const Publicacao = require('../models/publicacao');

exports.create = (req, res, next) => {
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;

    if(titulo === undefined || conteudo === undefined) {
        res.status(400).json({
            mensagem: 'Campos indefinidos'
        });
    }
    else
    {
        const publicacao = new Publicacao({
            titulo: titulo,
            conteudo: conteudo,
            criador: req.userData.id
        });
        publicacao.save().then(publicacaoCriada => {
            res.status(201).json({
                mensagem: 'Publicação adicionada com sucesso!',
                publicacao: publicacaoCriada
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;

    if(id       === undefined || titulo === undefined ||
       conteudo === undefined
    )
    {
        res.status(400).json({
            mensagem: 'Campos indefinidos'
        });
    }
    else
    {
        const publicacao = new Publicacao({
            _id: id,
            titulo: titulo,
            conteudo: conteudo,
            criador: req.userData.id
        });
        Publicacao.updateOne(
            {
                _id: id,
                criador: req.userData.id
            },
            publicacao
        ).then(resultado => {
            if(resultado.matchedCount > 0)
            {
                res.status(200).json({
                    mensagem: 'Registro alterado'
                });
            }
            else
            {
                res.status(401).json({
                    mensagem: 'Não autorizado!'
                });
            }
        }).catch(error => {
            res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        });
    }
}

exports.delete = (req, res, next) => {
    id = req.body.id;
    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        Publicacao.deleteOne({
            _id: id,
            criador: req.userData.id
        }).then(resultado => {
            if(resultado.acknowledged &&
               resultado.deletedCount > 0
            )
            {
                res.status(200).json({
                    mensagem: 'Publicacao excluída'
                });
            }
            else
            {
                res.status(401).json({
                    mensagem: 'Não Autorizado'
                })
            }
        }).catch(error => {
            res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        });
    }
}

exports.getOne = (req, res, next) => {
    id = req.params.id;
    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos não definidos'
        });
    }
    else
    {
        Publicacao.findById(id).then(publicacao => {
            if(publicacao)
            {
                res.status(200).json({
                    mensagem: 'Publicação encontrada',
                    publicacao: publicacao
                });
            }
            else
            {
                res.status(404).json({
                    mensagem: 'Publicação não encontrada'
                })
            }
        }).catch(error => {
            res.status(500).json({
                mensagem: 'Erro no servidor'
            });
        });
    }
}

exports.getAll = (req, res, next) => {
    Publicacao.find().then(publicacoes => {
        res.status(200).json({
            mensagem: 'Publicações encontradas:',
            publicacoes: publicacoes
        });
    }).catch(error => {
        res.status(500).json({
            mensagem: 'Erro no servidor'
        });
    });
}

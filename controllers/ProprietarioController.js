const express = require('express');
const Proprietario = require('../models/proprietario');

exports.getAll = (req, res, next) => {
    Proprietario.findAll({
        order: [['nome', 'ASC']]
    }).then(proprietarios => {
        res.render('proprietario/index', { proprietarios });
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('proprietario/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;

    Proprietario.findOne({
        where: { nome : nome }
    }).then(proprietario => {
        if (!proprietario) {
            Proprietario.create({
                nome : nome
            }).then(() => {
                res.redirect('/proprietarios');
            });
        } else {
            res.redirect('/proprietarios');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    
    Proprietario.findByPk(id).then(proprietario => {
        res.render('proprietario/editar', {
            proprietario: {
                id,
                nome: proprietario.nome,
            }
        });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;

    Proprietario.update({
        nome : nome
    }, {
        where: { id : id }
    }).then(() => {
        res.redirect('/proprietarios');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Proprietario.destroy({
        where: { id }
    }).then(() => {
        res.redirect('/proprietarios');
    });
}

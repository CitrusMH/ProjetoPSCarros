const express = require('express');
const Marca = require('../models/marca');
const utils = require('../utils/utilidades');


exports.getAll = (req, res, next) => {
    Marca.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(marcas => {
        res.render('marca/index', { marcas });
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('marca/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const fundacao = req.body.fundacao;
    const extincao = req.body.extincao;

    Marca.findOne({
        where: {
            nome : nome
        }
    }).then(marca => {
        if (marca == undefined) {
            Marca.create({
                nome : nome,
                fundacao : utils.DataParaBanco(fundacao),
                extincao : utils.DataParaBanco(extincao)
            }).then(() => {
                res.redirect('/marcas');
            });
        } else {
            res.redirect('/marcas');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Marca.findByPk(id).then(marca => {
        res.render('marca/editar', { marca });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const fundacao = req.body.fundacao;
    const extincao = req.body.extincao;

    Marca.update({
        nome : nome,
        fundacao : utils.DataParaBanco(fundacao),
        extincao : utils.DataParaBanco(extincao)
    }, {
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/marcas');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Marca.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/marcas');
    });
}

const Veiculo = require('../models/veiculo');
const Marca = require('../models/marca');
const Proprietario = require('../models/proprietario');
const Categoria = require('../models/categoria');

exports.getAll = async (req, res, next) => {
    try {
        const veiculos = await Veiculo.findAll({
            order: [['modelo', 'ASC']],
            include: [{ model: Marca }, { model: Proprietario }, { model: Categoria }]
        });
        res.render('veiculo/index', { veiculos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.renderNovo = async (req, res, next) => {
    try {
        const marcas = await Marca.findAll({ order: [['nome', 'ASC']] });
        const proprietarios = await Proprietario.findAll({ order: [['nome', 'ASC']] });
        const categorias = await Categoria.findAll({ order: [['tipo', 'ASC']] });
        res.render('veiculo/novo', { marcas, proprietarios, categorias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res, next) => {
    const { modelo, ano, marcaId, proprietarioId, categoriaId } = req.body;

    try {
        const veiculo = await Veiculo.findOne({ where: { modelo } });

        if (!veiculo) {
            await Veiculo.create({
                modelo,
                ano,
                marcaId,
                proprietarioId,
                categoriaId
            });
            res.redirect('/veiculos');
        } else {
            res.redirect('/veiculos');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.renderEditar = async (req, res, next) => {
    const id = req.params.id;

    try {
        const veiculo = await Veiculo.findByPk(id);
        const marcas = await Marca.findAll({ order: [['nome', 'ASC']] });
        const proprietarios = await Proprietario.findAll({ order: [['nome', 'ASC']] });
        const categorias = await Categoria.findAll({ order: [['tipo', 'ASC']] });
        
        res.render('veiculo/editar', { veiculo, marcas, proprietarios, categorias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res, next) => {
    const { id, modelo, ano, marcaId, proprietarioId, categoriaId } = req.body;

    try {
        await Veiculo.update({
            modelo,
            ano,
            marcaId,
            proprietarioId,
            categoriaId
        }, { where: { id } });
        res.redirect('/veiculos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Veiculo.destroy({ where: { id } });
        res.redirect('/veiculos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

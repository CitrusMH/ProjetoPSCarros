const Sequelize = require('sequelize');
const connection = require('../database/database');
const Marca = require('./marca');
const Proprietario = require('./proprietario');
const Categoria = require('./categoria');

const Veiculo = connection.define('veiculos', {
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Veiculo.belongsTo(Marca);
Veiculo.belongsTo(Proprietario);
Veiculo.belongsTo(Categoria);

//Veiculo.sync({force: true});

module.exports = Veiculo;

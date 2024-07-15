const Sequelize = require('sequelize');
const connection = require('../database/database');

const Marca = connection.define('marcas', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fundacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    extincao: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

//Marca.sync({force: true});

module.exports = Marca;

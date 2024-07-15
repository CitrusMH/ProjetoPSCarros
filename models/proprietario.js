const Sequelize = require('sequelize');
const connection = require('../database/database');

const Proprietario = connection.define('proprietarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Proprietario.sync({force: true});

module.exports = Proprietario;

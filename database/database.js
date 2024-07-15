const Sequelize = require('sequelize');

const connection = new Sequelize(
    'veiculos', 
    'root', 
    'Gangplank@2',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    });

module.exports = connection;
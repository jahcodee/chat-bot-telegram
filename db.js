const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telega_bot',
    'root',
    'root',
    {
        host: '109.71.12.219' ,
        port: '6432',
        dialect: 'postgres' 
    }
)
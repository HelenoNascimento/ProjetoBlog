const Sequelize = require("sequelize");
const connection = new Sequelize('guiapress','root','7744123',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
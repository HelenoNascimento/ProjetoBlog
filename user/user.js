const Sequelize = require("sequelize");
const connection = require("../database/database");

// cria a usuario no banco
const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

});


module.exports = User;

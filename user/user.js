const Sequelize = require("sequelize");
const connection = require("../database/database");

// cria a usuario no banco
const User = connection.define('users',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//User.sync({force: true});
module.exports = User;

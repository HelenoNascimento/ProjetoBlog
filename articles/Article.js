const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require ("../categories/category");


// cria a tabela no banco

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

/********************criando relacionamento no banco de dados**************** */
Category.hasMany(Article); // uma categoria tem muitos artigos
Article.belongsTo(Category); // um artigo pertence a uma categoria


module.exports = Article;

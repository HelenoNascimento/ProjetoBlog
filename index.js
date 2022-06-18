const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require ("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

// carregando viewe engine ejs
app.set('view engine', 'ejs');

//static/// carregando arquivos staticos
app.use(express.static('public'));
//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Article = require("./articles/Article");
const Category = require("./categories/category");

//database

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error)=>{
        console.log(error);
    })

 app.use("/",categoriesController);
 app.use("/",articlesController);

app.get("/",(req, res)=>{
   res.render("index");
});

app.listen(8080, ()=>{
    console.log("o servidor esta rodando!");
});
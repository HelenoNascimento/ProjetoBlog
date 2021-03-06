const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require ("./database/database");
const session = require("express-session");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersCotnrollers = require("./user/UsersController");
const User = require("./user/User");


//sessions
app.use(session({
    secret: "entaoeleeh", cookie: {maxAge: 300000}
}));

// carregando viewe engine ejs
app.set('view engine', 'ejs');

//static/// carregando arquivos staticos
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

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
 app.use("/",usersCotnrollers)


 

 // lista todos os artigos na tela inicial
app.get("/",(req, res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit:3
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index",{articles: articles, categories: categories});
        });       
    });
  
});



//lista o artigo na sua propria tela
app.get("/:slug",(req,res)=>{
    var slug =req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article",{article: article, categories: categories});
            });    
        }else{
            res.redirect("/");
        }
    }).catch(error =>{
        res.redirect("/");
    })
})

app.get("/category/:slug",(req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
         
            Category.findAll().then(categories =>{
                res.render("index", {articles: category.articles, categories: categories});
            })
        }else{
            res.redirect("/");
        }
    }).catch(erro =>{
        res.redirect("/");
    })

})

app.listen(8080, ()=>{
    console.log("o servidor esta rodando!");
});



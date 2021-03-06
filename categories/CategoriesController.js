const express = require("express");
const router = express.Router();
const Category = require("./category");
const slugify = require("slugify");
const admninAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new", (req,res)=>{
   res.render("admin/categories/new");
});

// salva uma nova categoria
router.post("/categories/save",admninAuth,(req,res)=>{
    var title = req.body.title; // recebendo os dados do formulario
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});

//deleta categoria
router.post("/categories/delete",admninAuth,(req, res)=>{
    var id= req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories");
            });
        }else{//não for um numero
            res.redirect("/admin/categories");
        }
    }else{//null
        res.redirect("/admin/categories");
    }
})

router.get("/admin/categories",admninAuth,(req, res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });

});

// Abrindo a tela de editar categorias
router.get("/admin/categories/edit/:id",admninAuth,(req, res) =>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }
Category.findByPk(id).then(category =>{
        if(category != undefined){
            res.render("admin/categories/edit",{category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(error =>{
        res.redirect("/admin/categories");
    })
})

// editando categoria e eviando para o banco
router.post("/categories/update",admninAuth,(req,res)=>{
    var id =req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/categories");
    })
})

module.exports = router;
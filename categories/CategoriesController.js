const express = require("express");
const router = express.Router();
const Category = require("./category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req,res)=>{
   res.render("admin/categories/new");
});

// salva uma nova categoria
router.post("/categories/save",(req,res)=>{
    var title = req.body.title; // recebendo os dados do formulario
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});

//deleta categoria
router.post("/categories/delete",(req, res)=>{
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

router.get("/admin/categories",(req, res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });

});


module.exports = router;
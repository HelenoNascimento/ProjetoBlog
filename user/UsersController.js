const express = require ("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const admninAuth = require("../middlewares/adminAuth");

router.get("/admin/users",admninAuth,(req, res)=>{
   
    User.findAll().then(users =>{
        res.render("admin/users/index",{users: users});
    })
  
});
//,admninAuth
router.get("/admin/user/create",admninAuth,(req, res) =>{
    res.render("admin/users/create");
});



//criando usuarios
router.post("/users/create",(req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var nome = req.body.nome;
      User.findOne({where: {
        email: email
      }}).then( user =>{

        if(user == undefined){
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                nome: nome,
                email: email,
                senha: hash
            }).then(() =>{
                res.redirect("/admin/users");
            }).catch((err) =>{
                console.log(err)
                res.redirect("/");
            })
        }else{
            res.redirect("/admin/user/create");
        }
      }); 
});

router.get("/login",(req, res)=> {
    res.render("admin/users/login");
})

router.post("/authenticate", (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user =>{
        if(user != undefined){// se exite usuario com esse email
            // validando senha
            var correct = bcrypt.compareSync(password, user.senha);
            if(correct){
                req.session.user  ={
                    id: user.id,
                    email: user.email,
                }
                res.redirect("admin/articles");
            }else{
                res.redirect("/login");
            }

        }else{
            res.redirect("/login");
        }
    })
})


router.get("/logout", (req, res) =>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;
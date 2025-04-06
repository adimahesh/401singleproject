const express = require("express")
const path = require("path")
const model = require("../02Mongo/models/user")
const connect = require("../02Mongo/models/connect")
const app = express()

connect()
app.use(express.json())
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+"public")))
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/read",async (req,res)=>{
    const users = await model.find()
    console.log(users)
    res.render("users",{
        users:users
    })
})
app.get("/edit/:id", async (req,res)=>{
   const user = await model.findOne({_id:req.params.id})
   console.log(user)
    res.render("edit.ejs",{user})
})
app.get("/delete/:id",async(req,res)=>{

  const deleted = await model.deleteOne({
    _id:req.params.id
  })
   res.redirect("/read")

})
app.post("/edit/:id",async (req,res)=>{
    const {username,email,url}=req.body;
   const user = await model.updateOne({
    _id:req.params.id
   },{$set:{name:username,email,image:url}})
  res.redirect("/read")
})
app.post("/create", async (req, res) => {
    try {
        const check = await model.findOne({
            email:req.body.email
        })
        if(check){
           return res.send("user exist")
        }
        else{
        const user = await model.create({
            image: req.body.url,
            email: req.body.email,
            name: req.body.username
        });
    }

       return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
       return res.status(500).json({ error: err.message });
    }
});

app.listen(3000,()=>{
    console.log("App started")
})
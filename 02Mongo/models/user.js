const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    image:String,
    email:String,
    name:String

})
module.exports =  mongoose.model('logins',schema)






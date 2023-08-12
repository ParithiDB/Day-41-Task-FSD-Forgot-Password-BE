const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new Schema({
    fullName : {type:String, required:true},
    mobileNumber : {type:Number, required:true},
    mail : {type:String, required:true},
    password : {type:String, required:true},
    resetToken : {type:String, upsert:true}
})

module.exports = mongoose.model("users",usersSchema);
const mongoose = require("mongoose")

const detailsSchema = mongoose.Schema({
    name:{type:String,required:true},
    qualifcation:{type:String,required:true},
    applied_for:{type:String,required:true}
})

const OwnerSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Profilepic:{
        type:String,
        default:"",
    },
    orgnization:{
        type:String,
        required:true
    },
    applied_persons:[detailsSchema]
},{timestamps:true}
);

module.exports = mongoose.model("owner",OwnerSchema)
const mongoose = require("mongoose")

const detailsSchema = mongoose.Schema({
    job_title:{type:String,required:true},
    organization:{type:String,required:true},
    owner:{type:String,required:true},
})
const freelancerSchema = new mongoose.Schema({
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
    qualifcation:{
        type:String,
    },
    applied_jobs:[detailsSchema]
},{timestamps:true}
);

module.exports = mongoose.model("freelancer",freelancerSchema)
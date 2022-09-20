const router = require("express").Router()

const Freelancer = require("../models/freelancer")
const bcrypt = require("bcrypt")

router.post("/register",async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        const newuser = new Freelancer({
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword,
            qualifcation:req.body.qualifcation

        })
        const user = await newuser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login",async(req,res)=>{
    try {
       const user =  await Freelancer.findOne({email:req.body.email})
       !user && console.log("wrong credentials!")


       const validated =  await bcrypt.compare(req.body.password,user.password)
       !validated && console.log("wrong credentials!")
       const{password, ...others}= user._doc;
       res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

module.exports = router
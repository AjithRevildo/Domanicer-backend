const router = require("express").Router()
const User = require("../models/owner")
const Post = require("../models/post")
const Freelancer = require("../models/freelancer")
// creata post

router.post("/",async(req,res)=>{
    const newPost = new Post(req.body)
    console.log(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)        
    }
});

router.post("/add",async(req,res)=>{
    const {owner} = req.body
    console.log(owner)
    const{name,qualifcation,applied_for}=req.body
    console.log(`${name},${qualifcation},${applied_for}`)
    console.log( await User.findOne({username:owner}))
    var applied_persons = {name:name,qualifcation:qualifcation,applied_for:applied_for}
    await User.findOneAndUpdate({username:owner},{$push:{
         applied_persons:applied_persons,

    }})
    res.json("done")
    
})

router.post("/jobinfo",async(req,res)=>{
    const {owner} = req.body
    const{freelancer}=req.body
    
    const{job_title}=req.body
    const organization = await User.findOne({username:owner})
    console.log(organization)
       const final_oraginze = organization.orgnization
        var applied_jobs = {job_title:job_title,organization:final_oraginze,owner:owner}
      await Freelancer.findOneAndUpdate({username:freelancer},{$push:{
        applied_jobs:applied_jobs
      }})
      res.json("done")
})

router.get("/getinfo/:username",async(req,res)=>{
    const username = req.params.username
    console.log(username)
    try{
          const response = await  Freelancer.find({username:username})
          res.json(response[0].applied_jobs)
    }catch(error){
        res.json(error)
    }

})

router.get("/getapplied/:username",async(req,res)=>{
    const username = req.params.username
    console.log(username)
    try{
          const response = await  User.find({username:username})
          res.json(response[0].applied_persons)
    }catch(error){
        res.json(error)
    }

})






//get post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

//get All
router.get("/",async(req,res)=>{
    const username = req.query.username
    
    const catName = req.query.cat
    console.log(catName)
    try{
        let  posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({"ak":1})
    }
})

module.exports = router
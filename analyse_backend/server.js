const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
dotenv.config()

//routes
const authRoute = require("./routes/auth")
const ownerauthRoute = require("./routes/ownerauth")
const postRoute = require("./routes/Posts")
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("conect to mongoose")).catch(err=>console.log(err));


app.use(cors())
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,res,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("uploades")
})



app.use("/api/auth",authRoute);
app.use("/api/ownerauth",ownerauthRoute);
app.use("/api/write",postRoute)

app.listen(process.env.PORT,(req,res)=>{
    console.log("im im")
})
const express = require("express")
const multer  = require('multer')
const path = require('path')
const cors = require("cors")

const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        // console.log(file)
        cb(null,"Images")
    },
    
    filename:(req, file, cb)=>{
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage:storage})

 
app.post('/upload', upload.array('image') ,(req,res)=>{  //images == input name
    req.files.forEach((f)=>{
        console.log(f.path)
    })
    res.send("Images Uploaded")
})

app.listen(4000, ()=>{
    console.log("Server Is Running")
})

const express = require("express")
const multer = require('multer')
const path = require('path')
const cors = require("cors")
require('dotenv').config()

const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')

const app = express()
app.use(cors())

const s3 = new S3Client({ 
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
      },
})


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hivetechnologies',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname, 'Content-Type': file.mimetype });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname))
        }
    })
})


app.post('/upload', upload.single('image'), (req, res) => {  //images == input name
    console.log(req.file)
    res.send("Images Uploaded")
})

app.listen(4000, () => {
    console.log("Server Is Running")
})

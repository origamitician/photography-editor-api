const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const res = require('express/lib/response');

const app = express();
const multer = require("multer");
app.use(cors());
app.use(express.json())

require('dotenv').config();

mongoose.connect("mongodb+srv://micaiahcape22:micaiah05@urlshortener.afsxdo4.mongodb.net/?retryWrites=true&w=majority");

const path = require("path");
const storageDest = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storageDest})

app.get("/", (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.send("This is CORS friendly!")
})

app.get("/n", (req, res) => {
    console.log("just a test");
    res.send("a;sjf;lsdj;ldsajf;klaj. Check console");
})

app.post("/add", (req, res) => {
    console.log("trying to post");
    let i = new ImageDetail(req.body);
    i.save().then((err, data) => {
        if(err) console.log(err);
        console.log("data");
    })
})

app.post('/addimage', upload.single('image'), (req, res) => {
    if(!req.file){
        console.log("Error: please upload a file.")
    }else{
        res.json({name: req.file.filename, size: req.file.size, type: req.file.mimetype})
    }
})

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.get('/images/:id', (req, res) => {
    res.sendFile(__dirname + "/images/" + req.params.id)
})

const imageDetails = new mongoose.Schema({
    title: String,
    dateUploaded: Date,
    dateTaken: Date,
    keywords: [String],
    category: [String],
    description: String,
    urlIdentifier: String,
    location: String,
    camera: String,

    statistics:{
        views: Number,
        downloads: Number,
        likes: Number,
    }
})

const ImageDetail = mongoose.model("ImageDetails", imageDetails);

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});




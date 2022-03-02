const express = require('express');
const path = require('path');
require('dotenv').config();
// import express-fileupload npm library 
const fileUpload = require('express-fileupload');
const app = express();
const Image = require("./models/image");

// connect to mongoDB , calling JS file db on /db
require("./db")

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

//use express-fileupload as a middleware:
app.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    abortOnLimit: true

}))
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
})

//IMAGE GALLERY 
app.get('/images', (req, res) => {
    Image.find().then((allImages) => {
        console.log(allImages);
        res.render("images",{allImages: allImages})
            })
    //res.render('images')
});

app.post('/savedata', (req, res) => {
    console.log(req.body); // needs app.use(express.json());  output: { username: 'markdown' }
    console.log(req.files.userImage.name);
    // wrap jpeg
    const extension = req.files.userImage.name.split(".").pop();
    console.log(extension);

    //needs  this one to work app.use(fileUpload)({
    // limits:{fileSize: 2 * 1024 * 1024}
    new Image({
        name: req.body.username,
        category: req.body.categories,
        description: req.body.description,
        url: "blih",

    }).save((e, image) => {
        const idImage = image._id.toString();
        console.log(idImage);
        console.log(image._id.toString());
        Image.findByIdAndUpdate(idImage, {
            url: `/uploads/${idImage}.${extension}`
        }, {
            new: true,
            select: "url"
        }).then(image => {
            console.log(image.url);
            req.files.userImage.mv(path.join(__dirname, 'public', image.url))
        });
    })
    // save the file inside public folder
    // mv method to save (move) the file in some folder in our application
    req.files.userImage.mv(path.join(__dirname, 'public/uploads', req.files.userImage.name))
        .then(() => {
            res.json('done')
        }).catch(error => {
            res.json(error.message)
        })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
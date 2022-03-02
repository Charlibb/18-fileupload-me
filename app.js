const express = require('express');
const path = require('path');
require('dotenv').config();
// import express-fileupload npm library 
const fileUpload = require('express-fileupload');
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

//use express-fileupload as a middleware:
app.use(fileUpload({
    limits:{fileSize: 2 * 1024 * 1024},
    abortOnLimit: true

}))
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=> {
    res.render('index');
})

//IMAGE GALLERY 
app.get('/images',(req,res) =>{
    res.render('images')
});

app.post('/savedata', (req, res) => {
    console.log(req.body); // needs app.use(express.json());  output: { username: 'markdown' }
     console.log(req.files);  //needs  this one to work app.use(fileUpload)({
       // limits:{fileSize: 2 * 1024 * 1024}

       // save the file inside public folder
       // mv method to save (move) the file in some folder in our application
       req.files.userImage.mv(path.join(__dirname, 'public', req.files.userImage.name))
       .then(() =>{
           res.json('done')
       }).catch(error => {
           res.json(error.message)
       })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

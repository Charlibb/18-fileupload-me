const mongoose = require('mongoose');
const connectionString = `mongodb+srv://Carlos:${process.env.PASSWORD}@cluster0.ftxpg.mongodb.net/Gallery?retryWrites=true&w=majority`;
//import Image model:
const Image = require("./models/image")

mongoose.connect(connectionString);
const db = mongoose.connection;
//error handling
db.on("error", (error) => {
    console.log(error);
    process.exit(1)
});

db.once("open", () => {
    console.log("MongoDb connection is established")
})

//to save into MongoDB
/* new Image({
    name: "bla",
    category: "bla",
    description: "bla",
    url: "bla",

}).save() */
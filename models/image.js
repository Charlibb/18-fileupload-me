const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    url: String,
});

const Image = mongoose.model("Image", imageSchema);


module.exports= Image
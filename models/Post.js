const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


module.exports = mongoose.model('userdb', PostSchema);
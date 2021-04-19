const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    movies: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"}
    ]
})

const member = mongoose.model('Member', memberSchema);
module.exports = member;

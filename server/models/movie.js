const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
    name: String,
    premiered: String,
    image: String,
    genres:[" ", " ", " "],
    subscriptions: [

         {  type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
         } ,

    ]
})


const movie = mongoose.model('Movie', movieSchema);
module.exports = movie;


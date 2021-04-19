const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');
const userController = require('./controllers/user_controller');
const membersController = require('./controllers/members_controller');
const movieController = require('./controllers/movie_controller');

if (process.env.PASSWORD_SECRET === undefined) {
    console.error("Error in configuration: you must configure PASSWORD_SECRET in the environment vars")
    return
}
if (process.env.JWT_SECRET === undefined) {
    console.error("Error in configuration: you must configure JWT_SECRET in the environment vars")
    return
}

let app = express();

app.use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/shows',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
app.use(cors());

app.use('/api/movies', userController.authenticateMiddleware, movieController);
app.use('/api/members', userController.authenticateMiddleware, membersController);
app.use('/api/users', userController.router);

app.listen(8000, () => {
    console.log('Serving on port 8000')
})


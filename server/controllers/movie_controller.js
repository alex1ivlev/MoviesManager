const express = require('express');
const movieBL = require('../models/movieBL');
const memberBL = require("../models/memberBL");
const appRouter = express.Router();

//GET request to show all the movies

appRouter.route('/')
    .get(async function(req,resp)
    {
        let movies = await movieBL.getAllMovies();
        return resp.json(movies);
    });

//GET request to show specific movie

appRouter.route('/:id')
    .get(async function (req, resp)
    {
        let id = req.params.id;
        let movie = await movieBL.getMovieById(id);
        return resp.json(movie);
    })

//POST request to add new movie

appRouter.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let result = await movieBL.addMovie(obj);
        return resp.json(result);
    })

//PUT request to update a movie

appRouter.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let result = await movieBL.updateMovieById(id,obj);
        return resp.json(result);
    })

//DELETE request to delete a movie

appRouter.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;

        let result = await movieBL.deleteMovieById(id);
        return resp.json(result);
    })
//POST request to add member to "Subscriptions Watched"

appRouter.route('/:id/members/:member_id')
    .post(async function(req,resp)
    {
        let movie_id = req.params.id;
        let member_id = req.params.member_id;
        let result = await movieBL.memberToMovie(movie_id, member_id);
        return resp.json(result);
    })

module.exports = appRouter;

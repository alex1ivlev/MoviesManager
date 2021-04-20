const express = require('express');
const membersBL = require ('../models/memberBL');
const appRouter = express.Router();

//GET requests all members/ specific member

appRouter.route('/')
    .get(async function (req, resp)
    {
        let members = await membersBL.getMembers();
        return resp.json(members);
    })

appRouter.route('/:id')
    .get(async function (req, resp)
    {
        let id = req.params.id;
        let member = await membersBL.getMember(id);
        return resp.json(member);
    })


//POST request to "Movies Watched"

appRouter.route('/:id/movies/:movie_id')
    .post(async function(req,resp)
    {
        let id = req.params.id;
        let movie_id = req.params.movie_id;
        let result = await membersBL.movieToUser(id, movie_id);
        return resp.json(result);
    })

//PUT request to update a member

appRouter.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let result = await membersBL.editMember(id,obj);
        return resp.json(result);
    })


//DELETE request to delete a member and movies he watched

appRouter.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let result = await membersBL.deleteMember(id);
        return resp.json(result);
    })

//POST request to add new member

appRouter.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let result = await membersBL.addMember(obj);
        return resp.json(result);
    })



module.exports = appRouter;

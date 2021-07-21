const express = require('express');
const userBL = require('../models/userBL');
const user = require('../models/user');
const jwt = require("jsonwebtoken");
const appRouter = express.Router();

//POST request to create new user

appRouter.route('/')
    .post(async function (req, resp) {
        let obj = req.body
        try {
            let result = await userBL.addUser(obj);
            return resp.json(result);
        } catch (e) {
            if (e.code === 11000) {
                resp.status(400)
                return resp.json({errcode: 3, error: "username already exists"})
            }
            resp.status(500)
            resp.json(e)
            throw e
        }
    })

//POST request to login

appRouter.route('/login')
    .post(async function (req, resp) {
        let user = req.body.username
        let password = req.body.password
        try {
            let result = await userBL.login(user, password);
            return resp.json({token: result});
        } catch (e) {
            resp.status(401)
            return resp.json({errcode: 2, error: "username or password invalid"})
        }

    })


// JWT secret is configurable via env var `JWT_SECRET`
exports.authenticateMiddleware = function (req, resp, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return resp.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            resp.status(403)
            console.log(err)
            return resp.json(err)
        }

        req.user = user
        next()
    })
}

exports.router = appRouter;

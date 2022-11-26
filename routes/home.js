/**
 * Web Atelier 2022  Exercise 5 - Web Apps and APIs with Express
 *
 * Student: __STUDENT NAME__
 *
 * /index.html router
 *
 */

const express = require('express');
const router = express.Router();
module.exports = router;

const hs = require('../model/high_scores');

router.get(["/", "index", "/index.html"], (req, res)=> {
    res.render('index', {data : hs.data});
})
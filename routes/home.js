/**
 * Web Atelier 2022  Exercise 6 - Persistent Web Apps and APIs with MongoDB
 *
 * Student: __STUDENT NAME__
 *
 * /index.html router
 *
 */

const express = require('express');
const router = express.Router();
module.exports = router;


let { model } = require("../model/");


router.get(["/", "index", "/index.html"], (req, res) => {

    /* Quiz 11 */
    model.high_scores.find({}).toArray().then(high_scores => {

        res.render("index.ejs", { data : high_scores });
    });
});

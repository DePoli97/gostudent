/**
 * Web Atelier 2022  Exercise 5 - Web Apps and APIs with Express
 *
 * Student: __STUDENT NAME__
 *
 * /high_scores router
 *
 */



const { render } = require('ejs');
const express = require('express');
const router = express.Router();
module.exports = router;

const hs = require('../model/high_scores');

router.get("/game_over", (req, res)=> {

    console.log(req.query.time + "time")

    res.render('game_over', {
        player : req.query.player || "", 
        score : req.query.score,
        time : req.query.time
    });
});

router.post('/', (req, res)=> {
    
    hs.update_score({
        player : req.body.player, 
        score : req.body.score,
        time: req.body.time
    });

    hs.save();

    res.redirect('index.html');
});
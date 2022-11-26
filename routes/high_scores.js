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

let { model } = require("../model/");

const ObjectId = require('mongodb').ObjectId;

router.get("/", (req, res)=> {
    model.high_scores.find({}).toArray().then(e => {
        res.format({
            'text/html': function () {
                res.render('includes/high_scores', {data : e})
            },

            'application/json': function () {
                res.json(e)
            }
        })
    })
});


router.get("/game_over", (req, res)=> {

    if (req.query.chall) {
        let filter = {
            text : req.query.chall
        }
        model.typing_challenges.updateOne(filter, {$inc: {played : 1}})     //uses update operator to increment the value of the played field
    }

    let o = {
        player : req.query.player || "", 
        score : req.query.score,
        time : req.query.time
    };

    res.render('game_over', o);
});

router.post('/', (req, res)=> {
    
    let o = {
        player : req.body.player, 
        score : req.body.score,
        time: req.body.time
    };

    model.high_scores.insertOne(o).then(e => {
        res.format ({
            'text/html': function () {
                res.redirect('index.html');
            },

            'application/json': function () {
                let filter = {_id : new ObjectId(e.insertedId)};
                model.high_scores.findOne(filter).then(result => {
                    res.status(201).json(result);
                })
            }
        })
    })
});

router.delete('/', (req, res)=> {

    model.high_scores.deleteMany({}).then(result => {
        res.status(204).send(JSON.stringify(result));
    });
});     //result.deletetCount to see how many objects were deleted
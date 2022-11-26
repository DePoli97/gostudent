/**
 * Web Atelier 2022  Exercise 5 - Web Apps and APIs with Express
 *
 * Student: __STUDENT NAME__
 *
 * /games router
 *
 *
 */

const express = require('express');
const router = express.Router();
module.exports = router;


const fs = require('fs-extra');

let model = require("../model/typing-challenges");


const hs = require('../model/high_scores');

router.get("/typing", (req, res)=> {
    res.render('typing-game', {data : hs.data});
});

router.get("/snake", (req, res)=> {
    res.render('snake', {data : hs.data});
});

router.post("/random", (req, res)=> {
    let p = req.body.player
    
    let game = Math.random() > 0.5 ? 'typing' : 'snake';

    res.redirect(`${game}?player=${p}`);
});

router.get('/typing/challenges', (req, res)=> {
    res.render('typing-challenges', {data : model.data});
});

router.post('/typing/challenges', (req, res)=> {

    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(req.body.text)) 
        res.sendStatus(400);
    else {

        model.add_chall({
            text : req.body.text,
            author : req.body.author,
            level : req.body.level
        })

        res.render('typing-challenges', {data : model.data});
    }
});

router.get('/typing/challenges/:id/edit',(req, res)=> {
    let id = req.params.id;
    if (model.data[id] != undefined)
        res.render('typing-challenges-edit', {data : dmodel.data, i : id});
    else 
        res.sendStatus(404);
});

router.put('/typing/challenges/:id',(req, res)=> {


    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;  //RegExp object, used to match text with a pattern

    if (format.test(req.body.text)) 
        res.sendStatus(400);

    else {
        let id = req.params.id;
        model.update_chall(id, {
            text : req.body.text,
            author : req.body.author,
            level : req.body.level
        });

    res.redirect('/games/typing/challenges');
    }
});


router.delete('/typing/challenges/:id', (req, res)=> {
    let id = req.params.id;

    model.delete_chall(id);
    res.redirect('/games/typing/challenges');
});

router.get('/typing/challenges.js', (req, res)=> {
    
    res.render('typing-challenges-js', {challenges : model.data})
});
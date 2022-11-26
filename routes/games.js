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

let { model } = require("../model/");

const ObjectId = require('mongodb').ObjectId;

router.get("/typing", (req, res)=> {
    model.high_scores.find({}).toArray().then(e => {
        res.render('typing-game', {data : e});
    })
});

router.get("/snake", (req, res)=> {
    model.high_scores.find({}).toArray().then(e => {
        res.render('snake', {data : e});
    })
});

router.post("/random", (req, res)=> {
    let p = req.body.player


    model.games.find({}).toArray().then(e => {
        e = e.map(el => el.game);
        let i = Math.floor(Math.random() * e.length);
        res.redirect(`${e[i]}?player=${p}`)
    });
    
    // let game = Math.random() > 0.5 ? 'typing' : 'snake';

    // res.redirect(`${game}?player=${p}`);
});

router.get('/typing/challenges', (req, res)=> {

    let filter = {};
    if (Object.keys(req.query).length !== 0) {
        if (req.query.author)
            filter.author = req.query.author;
        if (req.query.level) {
            let s = req.query.level
            let setOr = s.split(',');
            let p = s.indexOf('-');
            let prev = p - 1;
            let next = p + 1;
            let setAnd = [s[prev], s[next]];
            for (let i = parseInt(s[prev]) + 1; i < parseInt(s[next]); i++) {
                setAnd.push(i + '');
            }
            let new_sOr = [];
            for (let i = 0; i<setOr.length; i++) {
                new_sOr[i] = {level : setOr[i]}
            }
            setAnd.forEach(e => {
                new_sOr.push({level: e});
            })
            filter.$or = new_sOr;               //$or operator performs a logical OR on an array
        }
    }

    model.typing_challenges.find(filter).toArray().then(e => {
        res.format({
            'text/html': function () {
                res.render('typing-challenges', {data : e});
            },

            'application/json': function () {
                res.json(e)
            }
        })
    })
});

router.post('/typing/challenges', (req, res)=> {

    let o = {
        text : req.body.text,
        author : req.body.author,
        level : req.body.level,
        played : 0
    }

    model.typing_challenges.insertOne(o).then(e => {
        res.format ({
            'text/html': function () {
                model.typing_challenges.find({}).toArray().then(tc => {
                    res.render('typing-challenges', {data : tc});
                })
            },

            'application/json': function () {
                let filter = {_id : new ObjectId(e.insertedId)};
                model.typing_challenges.findOne(filter).then(result => {
                    res.status(201).json(result);
                })
            }
        })
    })
});

router.get('/typing/challenges/:id/edit',(req, res)=> {
    let id = {_id : new ObjectId(req.params.id)}
    model.typing_challenges.findOne(id).then(e => {
        res.render('typing-challenges-edit', {data : e, i : id._id});
    })
});

router.put('/typing/challenges/:id',(req, res)=> {

    let o = {
        _id : new ObjectId(req.params.id),
        text : req.body.text,
        author : req.body.author,
        level : req.body.level,
        played : 0
    }


    let id = {_id : o._id}

    model.typing_challenges.replaceOne(id, o, {upsert: true}).then(e => {       //upsert creates a new document if no documents match the filter
        res.format({
            'text/html': function () {
                res.redirect('/games/typing/challenges');
            },

            'application/json': function () {
                model.typing_challenges.findOne(id).then(tc => {
                        if (e.upsertedCount == 0) {
                            res.json(JSON.stringify(tc));
                        } else {
                            res.status(201).json(tc);
                        }
                    })
            }
        })
    })
});

router.delete('/typing/challenges/ALL', async (req, res)=> {

    let del = await model.typing_challenges.deleteMany({});
    res.status(204).send(del)

    // model.typing_challenges.deleteMany({}).then(result => {
    //     res.status(204).send(JSON.stringify(result));
    // });
});

router.delete('/typing/challenges/:id', (req, res)=> {
    let id = {_id : new ObjectId(req.params.id)};

    model.typing_challenges.findOneAndDelete(id).then(e => {
        res.format ({
            'text/html': function () {
                res.redirect('/games/typing/challenges');
            },

            'application/json': function () {
                res.status(204).end();
            }
        })
    })
});

router.get('/typing/challenges.js', (req, res)=> {
    model.typing_challenges.find({}).toArray().then(e => {
        res.render('typing-challenges-js', {challenges : e})
    })
});

router.get('/typing/challenges/:id', (req, res)=> {
    try {
        let id = {_id : new ObjectId(req.params.id)}
        model.typing_challenges.findOne(id).then(e => {
            if (e == null)
                res.status(404).end();
            else
                res.json(e);
        })
    } catch (e) {
        res.status(404).end();
    }   
});

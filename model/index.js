/**
 * Web Atelier 2022  Exercise 6 - Persistent Web Apps and APIs with MongoDB
 *
 * Student: __STUDENT NAME__
 *
 * Task 1
 *
 */

const mongodb = require('mongodb');

/* Quiz 1 */
const mongodb_uri = 'mongodb://127.0.0.1:27017/';

/* Task 4 */
//const mongodb_uri = 'mongodb+srv://db_user:mF14Cac1Jfvg2wZz@cluster0.x6zd3.mongodb.net/Feedback?retryWrites=true&w=majority';

/* Quiz 2 */
const client = new mongodb.MongoClient(mongodb_uri);

/* Quiz 3 */
const db_name = 'web-atelier-ex';

/* Quiz 4 */
const collection_names = ['high_scores', 'typing_challenges', 'games'];

/* Quiz 5 */
const model = {};

console.log("Connecting to mongodb server");

/* Quiz 6 */
client
    .connect() /* Quiz 7 */
    .then(client => {
        console.log("Connected to mongodb server");

        /* Quiz 8 */
        model.db = client.db(db_name);                  //select which db to use
        collection_names.forEach(c=>{                   //select which collections to use
            /* Quiz 9 */
            model[c] = model.db.collection(c);
        })




        //initialize games collection on db
        model.games.find({game : 'snake'}).toArray().then(e => {
            if (e.length === 0)
                model.games.insertOne({game : 'snake'});
        });
        model.games.find({game : 'typing'}).toArray().then(e => {
            if (e.length === 0)
                model.games.insertOne({game : 'typing'});
        });

    }) /* Quiz 10 */
    .catch(err => console.error(err));


exports.model = model;
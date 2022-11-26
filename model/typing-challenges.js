/**
 * Web Atelier 2022  Exercise 5 - Web Apps and APIs with Express
 *
 * Student: __STUDENT NAME__
 *
 * challenges Model
 *
 */

const fs = require('fs-extra');
const path = require('path');

let challenges = [];
let challenges_id = 0;

try {
    o = fs.readJSONSync(path.resolve("./model/challenges.json"));
    challenges = o.challenges;
    challenges_id = o.challenges_id;
} catch (e) { }

function save(){
    fs.writeJSONSync(path.resolve("./model/challenges.json"), {challenges, challenges_id});
}

function nextId() {
    return challenges_id++;
}

function add_chall(newchall) {
    newchall.id = nextId();
    challenges.push(newchall);
    save();
}

function update_chall(i, newchall) {
    newchall.id = challenges[i].id;
    challenges[i] = newchall;
    save();
}

function delete_chall(i) {
    if (challenges.length > 1) {
        challenges.splice(i, 1);
        challenges_id --;
        for (let j = i; j < challenges.length; j++) {
            challenges[j].id -= 1;
        }
    }
    else {
        challenges.pop();
        challenges_id = 0;
    }
    save();
}

module.exports = {
    data: challenges,
    nextId,
    save,
    add_chall,
    update_chall,
    delete_chall
}
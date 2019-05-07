// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
    client.connect(function(err, client) {
        console.log(err);
        console.log("Connected correctly to server");

        const db = client.db("testing");
        const collection = db.collection('pictures');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            res.send(docs);
        });
    });

});

module.exports = router;

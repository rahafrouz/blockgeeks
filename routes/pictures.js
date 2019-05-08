// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;
const fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

function callback(images, res) {
    let consentedImgs = [];
    let unconsentedImgs = [];

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItYUR1dmxoUE92M2k0MTVWSnU4cHQ5cVZqREZ0VDdFSWNVRzByeXc1cjZVIn0.eyJqdGkiOiJmMDhkZDRlMS0yNDU3LTQzNTctOWY5Ny0yMTRhMmM1Y2RlMzkiLCJleHAiOjE1NTczMzc2OTcsIm5iZiI6MCwiaWF0IjoxNTU3MzAxNjk3LCJpc3MiOiJodHRwczovL2lhbS5pZ3JhbnQuaW8vYXV0aC9yZWFsbXMvaWdyYW50LXVzZXJzIiwiYXVkIjoiaWdyYW50LWlvcy1hcHAiLCJzdWIiOiIyZDJhYjY5OC1jNTViLTQyODktYWYyNy04ZTM1ZDE0ODk4NTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpZ3JhbnQtaW9zLWFwcCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImYxZDI3ODEwLWM4NjEtNGI3Yi1iZTYxLWZmNWYyZjY1ZTA2ZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkJsb2NrZ2Vla3MgQWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbkBibG9ja2dlZWtzLmNvbSIsImdpdmVuX25hbWUiOiJCbG9ja2dlZWtzIEFkbWluIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGJsb2NrZ2Vla3MuY29tIn0.EEBrJAfxD3yH8ZRu7TcpsLEuAWr-kHshV0GJ6Fk1rh_zyECQIExqbMjxR3GyjoAZ9wtcak_9sqdTWS--fywZDGi5hu5SSv7-qhe5YQnEeyf5IDSCWMAbcGrQ5IoE0QAEB7fPvpfI8eAj3j95ZsiSwCH8cUXRUfTV9IHkzq0cboNCw7bakj99alVbQtIqIMhsggD517yoG5AoGk6tyZEvNkHQ4CqIExyfDToJskIV3DUJ6ej7mu4t89yX9FGfRZXlAiq6Ht56dbQSHTdDxPkPWhFs9Rtszduf7gnKM4OJfprmM6bGtJ2m-N97AX5gnAt8zVGn6E5S8Is2I-UGfcTJbQ'
    };

    fetch('https://staging-api.igrant.io/v1/organizations/5cd068161f19e3000164be83/purposes/5cd1742780ddb40001767cdf/attributes/5cd17f3380ddb40001767ce7/consented/users', {
            method: 'GET',
            headers: headers
        })
        .then(function(res) {
            return res.json();
        }).then(function(body) {
            let consentedIds = body.Users.map(function(user) { return user.ID });
            // console.log(body.Users);
            // console.log(consentedIds);
            console.log(images);

            // look for fully consented img in list of images
            images.forEach(function(item) {
                let includeUsrs = item.users.map(function(i) { return i.user_id; });
                console.log(includeUsrs);
                if (includeUsrs.every(u => consentedIds.includes(u))) {
                    consentedImgs.push(item);
                } else {
                    unconsentedImgs.push(item);
                }
            });
            // unconsentedImgs = images.filter(n => !consentedImgs.includes(n.users));
            console.log(consentedImgs);
            console.log(unconsentedImgs);

            res.render('pictures', {
                consentedImgs: consentedImgs,
                unconsentedImgs: unconsentedImgs
            });
        });
}

router.get('/', function(req, res, next) {

    client.connect(function(err, client) {
        console.log(err);
        console.log("Connected correctly to server");

        const db = client.db("testing");
        const collection = db.collection('pictures');
        // Find some documents
        collection.find({}).toArray(function(err, images) {
            assert.equal(err, null);
            callback(images, res);
        });
    }); //end of dbconnect

}); //end of get

module.exports = router;
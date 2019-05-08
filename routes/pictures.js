// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;
const fetch = require('node-fetch');

var express = require('express');
var router = express.Router();
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

// Store a list of all validated published images.


const mockData = [{
        id: '1',
        title: "An's",
        users: [
            { name: "AnP", uid: "5cd1806c80ddb40001767cea" },
        ],
        hidden: false,
        default_action: "blurred",
        original_url: '/uploaded/1.jpg',
        current_url: '/uploaded/1.jpg',
        processed: true,
    },
    {
        id: '2',
        title: "Fully consented pictures",
        users: [
            { name: "FlorS", uid: "5cd158b080ddb40001767cce" },
        ],
        hidden: true,
        default_action: "blurred",
        original_url: '/uploaded/2.jpg',
        current_url: '/uploaded/2.jpg',
        processed: true,
    },
    {
        id: '3',
        title: "Fully consented pictures",
        users: [
            { name: "Munrat", uid: "5cd28a4b80ddb40001767d80" }
        ],
        hidden: true,
        default_action: "blurred",
        original_url: '/uploaded/3.jpg',
        current_url: '/uploaded/3.jpg',
        processed: true,
    },
    {
        id: '4',
        title: "Fully consented pictures",
        users: [
            { name: "MeruY", uid: "5cd2896180ddb40001767d7b" },
        ],
        hidden: true,
        default_action: "blurred",
        original_url: '/uploaded/4.jpg',
        current_url: '/uploaded/4.jpg',
        processed: true,
    },
    {
        id: '5',
        title: "Fully consented pictures",
        users: [
            { name: "Amir Rah", uid: "5cd288ba80ddb40001767d76" },
        ],
        hidden: true,
        default_action: "blurred",
        original_url: '/uploaded/5.jpg',
        current_url: '/uploaded/5.jpg',
        processed: true,
    },
    {
        id: '6',
        title: "Fully consented pictures",
        users: [
            { name: "Amir Rah", uid: "5cd288ba80ddb40001767d76" },
            { name: "FlorS", uid: "5cd158b080ddb40001767cce" },
            { name: "Munrat", uid: "5cd28a4b80ddb40001767d80" }
        ],
        hidden: true,
        default_action: "blurred",
        original_url: '/uploaded/6.jpg',
        current_url: '/uploaded/6.jpg',
        processed: true,
    },
    {
        id: '7',
        title: "Fully consented pictures",
        users: [
            { name: "Amir Rah", uid: "5cd288ba80ddb40001767d76" },
            { name: "AnP", uid: "5cd1806c80ddb40001767cea" },
            { name: "MeruY", uid: "5cd2896180ddb40001767d7b" },
            { name: "FlorS", uid: "5cd158b080ddb40001767cce" },
            { name: "Munrat", uid: "5cd28a4b80ddb40001767d80" }
        ],
        hidden: false,
        default_action: "blurred",
        original_url: '/uploaded/7.jpg',
        current_url: '/uploaded/7.jpg',
        processed: true,
    },
    // {
    //     title: "Partially consented pictures",
    //     users: [
    //         { name: "Amir Rah", uid: "5cd288ba80ddb40001767d76" },
    //         // { name: "AnP", uid: "5cd1806c80ddb40001767cea" },
    //         // { name: "MeruY", uid: "5cd2896180ddb40001767d7b" },
    //         { name: "FlorS", uid: "5cd158b080ddb40001767cce" },
    //         { name: "Munrat", uid: "5cd28a4b80ddb40001767d80" }
    //     ],
    //     hidden: false,
    //     default_action: "blurred",
    //     original_url: '/images/6.jpg',
    //     current_url: '/images/b_6.jpg',
    //     processed: true,
    // },
];

// var pictMapping = {
//     "5cd288ba80ddb40001767d76": [ //amir
//         { imgId: '5', blurredUrl: '5-blurred-amir.jpg' },
//         { imgId: '6', blurredUrl: '6-blurred-amir.jpg' },
//         { imgId: '7', blurredUrl: '7-blurred-amir.jpg' },
//     ],
//     "5cd1806c80ddb40001767cea": [ //an
//         { imgId: '1', blurredUrl: '1-blurred-an.jpg' },
//         { imgId: '7', blurredUrl: '7-blurred-an.jpg' },
//     ],
//     "5cd2896180ddb40001767d7b": [ //meru
//         { imgId: '4', blurredUrl: '4-blurred-meru.jpg' },
//         { imgId: '7', blurredUrl: '7-blurred-meru.jpg' },
//     ],
//     "5cd158b080ddb40001767cce": [ //flor
//         { imgId: '2', blurredUrl: '2-blurred-florian.jpg' },
//         { imgId: '7', blurredUrl: '7-blurred-florian.jpg' },
//         { imgId: '6', blurredUrl: '6-blurred-florian.jpg' },
//     ],
//     "5cd28a4b80ddb40001767d80": [ //munrat
//         { imgId: '3', blurredUrl: '3-blurred-munrat.jpg' },
//         { imgId: '6', blurredUrl: '6-blurred-munrat.jpg' },
//     ],

// }

function callback(images, req, res, blurred) {
    // let consentedImgs = [];
    // let unconsentedImgs = [];

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItYUR1dmxoUE92M2k0MTVWSnU4cHQ5cVZqREZ0VDdFSWNVRzByeXc1cjZVIn0.eyJqdGkiOiIyZDFhODE0Mi05OTJiLTQ5YmItOWNiYi1kNjc1MjJlMGI3OTciLCJleHAiOjE1NTczODAwODcsIm5iZiI6MCwiaWF0IjoxNTU3MzQ0MDg3LCJpc3MiOiJodHRwczovL2lhbS5pZ3JhbnQuaW8vYXV0aC9yZWFsbXMvaWdyYW50LXVzZXJzIiwiYXVkIjoiaWdyYW50LWlvcy1hcHAiLCJzdWIiOiIyZDJhYjY5OC1jNTViLTQyODktYWYyNy04ZTM1ZDE0ODk4NTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpZ3JhbnQtaW9zLWFwcCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjNmM2FlMjMyLWQ3MDMtNDIwMC1hMDg5LWViY2JhNzY5MjE1MCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkJsb2NrZ2Vla3MgQWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbkBibG9ja2dlZWtzLmNvbSIsImdpdmVuX25hbWUiOiJCbG9ja2dlZWtzIEFkbWluIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGJsb2NrZ2Vla3MuY29tIn0.ZRikukmhIckR4V3tMBLvMVx0vc9rwNy2IzqbPJJE3Lj3arGWUClHGJzpKx6mgnBKEVxIGAZ0quJkUT08WJZXLR3I7Rpv6jmYXIs7lDTkX1cs0BeyjJAFZA2F5sXfA06AxkzM72QEd-yrKABT5rJODp0BgQLl4SCOPGeTkc0G-7IpNSZdpp0HMvbtyNN4TdchLXSiHHAwXkBj6JHSzf-JrlKxA1kg2-m8ITNBl8rPOqdn-H7cKd_Fw4nI2qFoIdFjNZEYuBO7_LPCXhGiZwrOQT3l25WrZtjV4e6Xx7QctVx8UzyBFgP1egMuOgpIspnxLhPbxf9GiNNCtw1Zlznt0A'
    };

    fetch('https://staging-api.igrant.io/v1/organizations/5cd068161f19e3000164be83/purposes/5cd1742780ddb40001767cdf/attributes/5cd17f3380ddb40001767ce7/consented/users', {
            method: 'GET',
            headers: headers
        })
        .then(function(res) {
            return res.json();
        }).then(function(body) {
            let consentedIds = body.Users.map(function(user) { return user.ID });
            let consentedIds_set = new Set(consentedIds); // console.log(body.Users);

            // look for fully consented img in list of images
            images.forEach(function(item) {
                let includeUsrs = item.users.map(function(i) { return i.uid; });
                // let intersection = new Set(includeUsrs.filter(x => consentedIds_set.has(x)));

                // console.log("users of image:", includeUsrs);
                // console.log("all consents", consentedIds);

                let unconsentedUsers = includeUsrs.filter(x => !consentedIds_set.has(x));
                // console.log("difference:", unconsentedUsers);
                item.unconsentedUsers = unconsentedUsers;

                if (includeUsrs.every(u => consentedIds.includes(u))) {
                    req.app.locals.consentedImgs.push(item);
                    // } else if (intersection) {
                    // console.log("intersection is not empty");
                } else {
                    req.app.locals.unconsentedImgs.push(item);
                }
            });

            let uploadedImgs = fs.readdir("./public/uploaded", function(err, items) {
                res.render('pictures', {
                    consentedImgs: req.app.locals.consentedImgs,
                    unconsentedImgs: req.app.locals.unconsentedImgs,
                    uploadedImgs: items
                });

            });

        });
}

router.get('/', function(req, res, next) {
    callback(mockData, req, res, true);

    // client.connect(function(err, client) {
    //     // console.log("Connected correctly to server");

    //     const db = client.db("testing");
    //     const collection = db.collection('pictures');
    //     const blurred = db.collection('blurred');

    //     var publishedImages = db.collection('published_images');
    //     // Find some documents
    //     collection.find({}).toArray(function(err, images) {
    //         // callback(images, res, blurred);
    //     });

    // }); //end of dbconnect

}); //end of get


module.exports = router;

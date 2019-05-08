var express = require('express');
var router = express.Router();

// router.get('/', function(req, res) {
//   res.render('gallery');
// });
// var publishedImages = []
var pictMapping = {
    "5cd288ba80ddb40001767d76": [ //amir
        { imgId: '5', blurredUrl: '5-blurred-amir.jpg' },
        { imgId: '6', blurredUrl: '6-blurred-amir.jpg' },
        { imgId: '7', blurredUrl: '7-blurred-amir.jpg' },
    ],
    "5cd1806c80ddb40001767cea": [ //an
        { imgId: '1', blurredUrl: '1-blurred-an.jpg' },
        { imgId: '7', blurredUrl: '7-blurred-an.jpg' },
    ],
    "5cd2896180ddb40001767d7b": [ //meru
        { imgId: '4', blurredUrl: '4-blurred-meru.jpg' },
        { imgId: '7', blurredUrl: '7-blurred-meru.jpg' },
    ],
    "5cd158b080ddb40001767cce": [ //flor
        { imgId: '2', blurredUrl: '2-blurred-florian.jpg' },
        { imgId: '7', blurredUrl: '7-blurred-florian.jpg' },
        { imgId: '6', blurredUrl: '6-blurred-florian.jpg' },
    ],
    "5cd28a4b80ddb40001767d80": [ //munrat
        { imgId: '3', blurredUrl: '3-blurred-munrat.jpg' },
        { imgId: '6', blurredUrl: '6-blurred-munrat.jpg' },
    ],

}

router.get('/', function(req, res, next) {
    // load blurred imgs
    // go back to gallery page with list of pictures to load
    let publishedImages = ["/images/5-blurred-amir.jpg", "/images/6-blurred-amir.jpg", "/images/1-blurred-an.jpg"];
    res.render('gallery', { publishedImages: publishedImages });
});

router.post('/', function(req, res, next) {
    let publishedImages = [];
    console.log(req.body);
    console.log(req.app.locals.consentedImgs);
    req.app.locals.consentedImgs.forEach(function(item) {
        publishedImages.push(item.original_url);
    })

    // option: 1-blurred, 2-hidden
    // append consented list of pics
    // for unconsented -> load the blurred/hidden version

    // load blurred imgs
    // go back to gallery page with list of pictures to load
    res.render('gallery', { publishedImages: publishedImages });
});

module.exports = router;
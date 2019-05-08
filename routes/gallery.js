var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// router.get('/', function(req, res) {
//   res.render('gallery');
// });
// var publishedImages = []
var pictMapping = {
    "5cd288ba80ddb40001767d76": [ //amir
        { imgId: '5', blurredUrl: '/images/5-blurred-amir.jpg' },
        { imgId: '6', blurredUrl: '/images/6-blurred-amir.jpg' },
        { imgId: '7', blurredUrl: '/images/7-blurred-amir.jpg' },
    ],
    "5cd1806c80ddb40001767cea": [ //images//an
        { imgId: '1', blurredUrl: '/images/1-blurred-an.jpg' },
        { imgId: '7', blurredUrl: '/images/7-blurred-an.jpg' },
    ],
    "5cd2896180ddb40001767d7b": [ //images//meru
        { imgId: '4', blurredUrl: '/images/4-blurred-meru.jpg' },
        { imgId: '7', blurredUrl: '/images/7-blurred-meru.jpg' },
    ],
    "5cd158b080ddb40001767cce": [ //images//flor
        { imgId: '2', blurredUrl: '/images/2-blurred-florian.jpg' },
        { imgId: '7', blurredUrl: '/images/7-blurred-florian.jpg' },
        { imgId: '6', blurredUrl: '/images/6-blurred-florian.jpg' },
    ],
    "5cd28a4b80ddb40001767d80": [ //images//munrat
        { imgId: '3', blurredUrl: '/images/3-blurred-munrat.jpg' },
        { imgId: '6', blurredUrl: '/images/6-blurred-munrat.jpg' },
    ],
}

router.get('/', function(req, res, next) {
    // load blurred imgs
    // go back to gallery page with list of pictures to load
    let publishedImages = ["/images/5-blurred-amir.jpg", "/images/6-blurred-amir.jpg", "/images/1-blurred-an.jpg"];
    res.render('gallery', { publishedImages: publishedImages });
});

router.post('/', urlencodedParser, function(req, res, next) {
    let publishedImages = [];
    req.app.locals.consentedImgs.forEach(function(item) {
        publishedImages.push(item.original_url);
    });

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            item = req.body[key];

            var params = req.body[key];
            if (params[1] == 1) {
                pictMapping[params[0]].forEach(function(item) {
                    if (item.imgId == key)
                        publishedImages.push(item.blurredUrl);
                });
            } else {
                console.log("hide this picture " + param);
                // hide the picture
                // do nothing, just dont load into published
            }
        }
        // for unconsented -> load the blurred/hidden version

    }

    // option: 1-blurred, 2-hidden
    // append consented list of pics
    // for unconsented -> load the blurred/hidden version
    res.render('gallery', { publishedImages: publishedImages });
});

module.exports = router;
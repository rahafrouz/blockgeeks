var express = require('express');
var router = express.Router();
var picIds = ["img_10.jpg", "img_4.jpg"]; 
var sourceFolder = "/publishedImages/";
router.get('/', function(req, res) {
  res.render('gallery', { sourceFolder: sourceFolder, picIds: picIds });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET gallery. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/gallery.html'));
});

module.exports = router;

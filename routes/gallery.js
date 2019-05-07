var express = require('express');
var router = express.Router();

/* GET gallery. */
router.get('/', function(req, res, next) {
  res.send("hello world");
});

module.exports = router;

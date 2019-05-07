var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	const mongoose = require('mongoose');
	mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

	const Cat = mongoose.model('Cat', { name: String });

	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => console.log('meow'));

  res.send('respond with a resource');
});

module.exports = router;

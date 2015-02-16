var express = require('express');
var router = express.Router();
var Person = require('../models/person').Person;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/import', function(req, res, next) {
    var createPerson = function (index) {
        var person = new Person;
        person.email = 'random.person+' + index + '@gmail.com';
        person.group = 'IT';

        person.save();
    };

    for (var i = 0; i < 100; i++) {
        createPerson(i);
    }

    res.json({message: 'ok'});
});

module.exports = router;

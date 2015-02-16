var express = require('express');
var router = express.Router();
var Person = require('../models/person').Person;
var _ = require('underscore');

/* GET home page. */
router.get('/', function (req, res, next) {
    var shufflePeople = function (callback) {
        Person.find({}, function (err, people) {
            var groups = [];
            //console.log(_.sample(people, 4));

            res.render('index', {people: people});
        });
    };

    shufflePeople();
});

router.get('/import', function (req, res, next) {
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

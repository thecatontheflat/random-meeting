var express = require('express');
var router = express.Router();
var Person = require('../models/person').Person;
var _ = require('underscore');

router.get('/', function (req, res, next) {
    var shufflePeople = function (callback) {
        Person.find({present: true}, function (err, people) {
            people = _.shuffle(people);
            var i, j, tmpArray;
            var chunk = 4;
            var newPeople = [];

            for (i = 0, j = people.length; i < j; i += chunk) {
                tmpArray = people.slice(i, i + chunk);

                if (tmpArray.length < 3) {
                    for (var k = 0; k < tmpArray.length; k++) {
                        newPeople[k].push(tmpArray[k]);
                    }
                } else {
                    newPeople.push(tmpArray)
                }
            }

            res.render('index', {groups: newPeople});
        });
    };

    shufflePeople();
});

router.get('/import', function (req, res, next) {
    var createPerson = function (index) {
        var department = _.sample(['IT', 'Sales', 'OPS', 'HR'], 1);
        var person = new Person;
        person.email = 'random.person+' + index + '@gmail.com';
        person.present = true;
        person.group = department;

        person.save();
    };

    Person.remove({}, function (err, res) {
        for (var i = 0; i < 98; i++) {
            createPerson(i);
        }
    });


    res.json({message: 'ok'});
});

module.exports = router;

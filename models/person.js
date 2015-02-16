var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    email: {type: String, index: true},
    group: {type: String}
});

module.exports = {
    Person: mongoose.model('Person', PersonSchema)
};
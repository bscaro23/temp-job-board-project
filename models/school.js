const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    about: {type: String, required: true},
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
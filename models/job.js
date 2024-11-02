const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: {type: String, required: true},
    timePosted: {type: Date, required: true},
    listingEnd: {type: Date, required: true},
    roles: {
        type: String,
        required: true,
        enum: ['Teacher', 'Support Staff', 'Administrator', 'Counselor', 'Maintenance'] 
    },
    pay: {type: Number, required: true},
    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    details: String,
    applicants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
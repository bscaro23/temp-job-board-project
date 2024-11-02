const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }
});

const candidateSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    roles: {
        type: String,
        required: true,
        enum: ['Teacher', 'Support Staff', 'Administrator', 'Counselor', 'Maintenance'] 
    },
    location: { type: String, required: true },
    chargeRate: { type: Number, required: true },
    rating: [ratingSchema],
    jobsAppliedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job', }]
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
const Job = require('../models/job'); 

const jobsToLocals = async (req, res, next) => {
    try {
        const jobs = await Job.find({}).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        }); 
        res.locals.jobs = jobs; 
        next(); 
    } catch (error) {
        console.error("Error loading jobs:", error);
        next(error); 
    }
};

module.exports = jobsToLocals;
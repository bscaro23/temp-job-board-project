const express = require('express');
const router = express.Router();


const User = require('../models/user.js');
const Candidate = require('../models/candidate.js');
const School = require('../models/school.js');
const Job = require('../models/job.js');
const session = require('express-session');

const journeyTabs = ['New Jobs', 'Applications', 'Offers', 'Accepted', 'Completed'] 
const currentDate = new Date();

router.get('/', async(req, res) => {

    try {
        const currentUser = await User.findById(req.session.user._id).populate('details');
        const jobIds = currentUser.details.jobsAppliedFor;

        const currentNewJobs = await Job.find({ 
            _id: { $nin: jobIds }, 
            listingEnd: { $gt: currentDate } 
        }).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        });


        const currentPage = 0;
        res.render('candidate/index.ejs', {
            currentUser,
            currentPage,
            journeyTabs,
            currentJobs: currentNewJobs
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/applications', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('details');
        const jobIds = currentUser.details.jobsAppliedFor;

        const currentApplications = await Job.find({ 
            _id: { $in: jobIds }, 
            listingEnd: { $gt: currentDate } 
        }).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        });

        const currentPage = 1;
        res.render('candidate/index.ejs', {
            currentUser,
            currentPage,
            journeyTabs,
            currentJobs: currentApplications
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
    }


});

router.get('/offers', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('details');
        const jobIds = currentUser.details.jobsOffered;

        
        const currentOffers = await Job.find({ 
            _id: { $in: jobIds }, 
            listingEnd: { $gt: currentDate } 
        }).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        });

        const currentPage = 2;
        res.render('candidate/index.ejs', {
            currentUser,
            currentPage,
            journeyTabs,
            currentJobs: currentOffers
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
    }


});

router.get('/accepted', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('details');
        const jobIds = currentUser.details.jobsAccepted;

        
        const currentAccepted = await Job.find({ 
            _id: { $in: jobIds }, 
            listingEnd: { $gt: currentDate } 
        }).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        });

        const currentPage = 3;
        res.render('candidate/index.ejs', {
            currentUser,
            currentPage,
            journeyTabs,
            currentJobs: currentAccepted
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
    }


});

router.get('/completed', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('details');
        const jobIds = currentUser.details.rating.jobId;

        
        const currentCompleted = await Job.find({ 
            _id: { $in: jobIds }, 
        }).populate({
            path: 'schoolId',
            populate: { path: 'details' } 
        });

        const currentPage = 4;
        res.render('candidate/index.ejs', {
            currentUser,
            currentPage,
            journeyTabs,
            currentJobs: currentCompleted
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
    }


});

router.get('/newjobs', (req, res) => {
    res.redirect('/')
})

router.get('/:id', async (req, res) => {
    try {
        const candidate = await User.findById(req.params.id).populate('details');
        if (!candidate) {
            return res.status(404).send('Candidate not found');
        }
            

        
        
        
        res.render('candidate/show.ejs', {
            candidate: candidate,
            user: req.session.user 
        });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();


const User = require('../models/user.js');
const Candidate = require('../models/candidate.js');
const School = require('../models/school.js');
const Job = require('../models/job.js');


router.get('/', async (req, res) => {
    console.log(req.session.user._id)
    const currentUser = await User.findById(req.session.user._id).populate('details');
    const userJobs = await Job.find({schoolId: req.session.user._id}).populate({
        path: 'applicants',
        populate: {
            path: 'details' 
        }
    });
    console.log(userJobs);
    res.render('school/index.ejs', {
        userJobs: userJobs,
        currentUser: currentUser
    });
});

router.get('/newJob', (req, res) => {
    res.render('jobs/new.ejs');
});

router.get('/:id', async (req, res) => {
    try {
        const school = await User.findById(req.params.id).populate('details');
        if (!school) {
            return res.status(404).send('Candidate not found');
        }
            

        
        
        
        res.render('school/show.ejs', {
            school: school,
        });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).send('Server Error');
    }
});

router.get('/job/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('schoolId applicants');
        if (!job) {
            return res.status(404).send('Job not found');
        }
        

        
        
        
        res.render('jobs/show.ejs', {
            job: job,
            user: req.session.user 
        });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).send('Server Error');
    }
});



router.post('/', async (req, res) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();

    try {
        const currentDate = new Date();

        const daysToAdd = parseInt(req.body.listingEnd, 10); 

        const listingEndDate = new Date(currentDate);
        listingEndDate.setDate(currentDate.getDate() + daysToAdd); 

        
        const newJob = {
            ...req.body,
            timePosted: currentDate, 
            listingEnd: listingEndDate, 
            schoolId: req.session.user._id
        };

        await Job.create(newJob);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/job/:jobId/apply', async (req, res)=> {
    try{
        const currentJob = await Job.findById(req.params.jobId);
        const currentUserDetails = await Candidate.findById(req.session.user.details)
        
        if(currentUserDetails.roles){
            currentJob.applicants.push(req.session.user._id);
            currentUserDetails.jobsAppliedFor.push(currentJob._id);

            await currentUserDetails.save();
            await currentJob.save();

            res.redirect('/');

        } else{
            res.redirect('/');
        }
    }catch(error){
        console.log(error);
        res.redirect('/');
    }
})



module.exports = router;
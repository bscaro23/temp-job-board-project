const express = require('express');
const router = express.Router();


const User = require('../models/user.js');
const Candidate = require('../models/candidate.js');
const School = require('../models/school.js');


router.get('/', async(req, res) => {

    const currentUser = await User.findById(req.session.user._id).populate('details');

    res.render('candidate/index.ejs', {
        currentUser: currentUser
    });
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
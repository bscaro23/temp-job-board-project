const express = require('express');
const router = express.Router();


const User = require('../models/user.js');
const Candidate = require('../models/candidate.js');
const School = require('../models/school.js');

router.get('/:detailsType', (req, res) => {
    const detailsType  = req.params.detailsType;
  
    if (detailsType === 'School') {
      res.render('school/new.ejs');
    } else if (detailsType === 'Candidate') {
      res.render('candidate/new.ejs');
    } else {
      res.status(404).send('Details type not found.');
    }
  });

  router.get('/:detailsType/edit', async (req, res) => {
    const detailsType  = req.params.detailsType;
    const userId = req.session.user._id;

    try{
        const currentUser = await User.findById(userId).populate('details');

        if (detailsType === 'School') {
            res.render('school/edit.ejs',{currentUser: currentUser});
          } else if (detailsType === 'Candidate') {
            res.render('candidate/edit.ejs', { currentUser: currentUser});
          } else {
            res.status(404).send('Details type not found.');
          }
        } catch(error) {
            console.log(error);
            res.redirect('/');
        }
  });

router.post('/School', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        if (String(currentUser.detailsType) === 'School'){
            const school =await School.create(req.body);
            currentUser.details = school._id;
            await currentUser.save();
            res.redirect('/');
        } 
    }catch (error){
        console.log(error);
        res.redirect('/');
    }

});

router.post('/Candidate', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        console.log(currentUser);
        if (String(currentUser.detailsType) === 'Candidate'){
            console.log('in');
            const candidate = await Candidate.create(req.body);
            currentUser.details = candidate._id;
            await currentUser.save();
            res.redirect('/');
        } 
    }catch (error){
        console.log(error);
        res.redirect('/');
    }

});



router.put('/:detailsType', async (req, res) => {

  console.log('start')

  const detailsType = req.params.detailsType;

  console.log(detailsType);

  let currentUserDetails;
  
  if (detailsType === 'School')  currentUserDetails = await School.findById(req.session.user.details);
  if (detailsType === 'Candidate')  currentUserDetails = await Candidate.findById(req.session.user.details);
  
    try {
        console.log(req.body);
        await currentUserDetails.updateOne(req.body);
        res.redirect('/')
    } catch (error){
        console.log(error);
        res.redirect('/');
    }
    
});

router.delete('/', async (req, res) => {

  try {
      await User.findByIdAndDelete(req.session.user._id)
      res.redirect(`/`);
      
  } catch (error){
      console.log(error);
      res.redirect('/');
  }
  
  
});

module.exports = router;
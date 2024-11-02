const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const userHasDetails = require('./middleware/user-has-details.js');
const authController = require('./controllers/auth.js');
const detailsController = require('./controllers/details.js');
const candidateController = require('./controllers/candidate.js');
const schoolController = require('./controllers/school.js');
const jobsToLocals = require('./middleware/jobs-to-local.js');

const port = process.env.PORT ? process.env.PORT : '3000';

const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);
app.use(jobsToLocals);



app.get('/', (req, res) => {
  if (req.session.user){
    res.redirect(`/users/${req.session.user._id}/${req.session.user.detailsType}`);
  } else {
    res.render('auth/sign-in.ejs');
    
  }
});



app.use('/auth', authController);
app.use(isSignedIn);
app.use(`/users/:userId/details`, detailsController);

app.use(userHasDetails);

app.use(`/users/:userId/Candidate`, candidateController);
app.use(`/users/:userId/School`, schoolController);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});



//todo need to do the drop down and add the edit route
//todo 2 in candidate edit.ejs need to fix value for drop down
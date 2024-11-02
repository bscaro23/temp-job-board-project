#  Oscar's Job Board
<img src='./public/images/page 1.png' alt="Screenshot of Landing Page">

## Description

For the second project in the General Assembly Full Stack cours, we were tasked with creating a MEN Stack CRUD App.

Idecided upon the creation of a temporary job board.

There will be 2 types of users; Candidat and Client.

The client will produce a job advert, the candidate will apply. From the applicants the client will select the candidate the would like.

As it is for temporary work I devised that candidates would be rated following a shift, similar to uber.

## Deliverables

1. Page to always ask for the user to login if they haven't already.
2. User to fill out their basic information before they have full access to the websites functionality.
3. Candidates should be able to:
    * View recent Jobs
    * Apply to a job
    * View the information about the business posting the job
    * See a dexcription of the job
4. Client should be able to:
    * View candidates
    * View their Jobs and applicants to each job
    * View all applicants


#### ***Game Link*** -
#### ***Repo Clone Link*** -

## Attributes

***CSS*** - for styling

***JavaScript*** - for animation/functionality

***HTML*** - in conjunction with ejs for creating the DOM

***Mongoose*** - for database management

## Plan and Code

1. Using a general auth template, I would edit the User model so that there a distinct types. Each type is related to a model of the same name which provides details.

2. Middleware checks whether details are provided and will force User to the details page if not.

3. Details controller is set up to allow for creation of details and editing as well in a dynamic manner.

```
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
```
I particularly like the way this work in the above put function which in my example takes 2 different detailsType but is feesably infinately scalable.



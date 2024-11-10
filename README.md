#  Oscar's Job Board
<img src='./public/images/page 1.png' alt="Screenshot of Landing Page">

## Description

For the second project in the General Assembly Full Stack course we were tasked with creating a MEN Stack CRUD App.

I decided upon the creation of a temporary job board, as my name is Oscar I decided upon an orange juice theme, playing off of the OJ brought about by Oscar's Job Board.

There will be 2 types of users; Candidate and Client.

The client will produce a job advert, the candidate will apply. From the applicants the client will select the candidate they would like.

As it is for temporary work I devised that candidates would be rated following a shift, similar to uber.

## Deliverables

1. Page to always ask for the user to login if they haven't already.
2. User to fill out their basic information before they have full access to the websites functionality.
3. Candidates should be able to:
    * View recent Jobs
    * Apply to a job
    * View the information about the business posting the job
    * See a description of the job
4. Client should be able to:
    * View candidates
    * View their Jobs and applicants to each job
    * View all applicants
    * Offer the job to said candidate
    * Following job completion they should be able to rate the candidate


#### ***Game Link*** -
#### ***Repo Clone Link*** -

## Attributes

***CSS*** - for styling

***JavaScript*** - for animation/functionality

***HTML*** - in conjunction with ejs for creating the DOM

***Mongoose*** - for database management

***Express*** - to create database requests as well as routers

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

4. I then created a user journey in which they apply for a job, they are then offered, accept and are rated upon their performance. The client side implementation of this is yet to be completed. Within this I implemented a moving tab bar which is highlighted depending on what page the user is currently on.

```
const journeyTabs = ['New Jobs', 'Applications', 'Offers', 'Accepted', 'Completed'] 
const currentDate = new Date();

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
```
For example in the above code, it will only show jobs that have been applied to by the candidate, the current page will link to the index of the journeyTabs. I like this implementation as it allows for upscaling as well as can be transferred to the client side.

```
<%- include('../partials/_header.ejs') %>
<%- include('../partials/_navbar.ejs') %>
<%- include('../partials/_searchbar.ejs') %>
    
    <div class="main">
        <% currentJobs.forEach((job)=>{ %>
                <a href="/users/<%=user._id%>/School/job/<%= job._id %>">
                    <div class="job-box">
                        <div class="job-box-header">
                            <h1><%= job.title %> </h1>
                            <h2> $<%= job.pay %>/day </h2>
                        </div>
                        <div class="job-box-company-picture"></div>
                        <div class="job-box-info">
                            <h4>Location: <%= job.schoolId.details.location %></h4>
                            <h4>Apply By: <%= job.listingEnd.getDate() %>/<%= job.listingEnd.getMonth() + 1 %>/<%= job.listingEnd.getFullYear() %></h4>
                        </div>
                        <% if(currentUser.details.jobsAppliedFor.some(jobId => jobId.toString() === job._id.toString())) { %>
                            <form action="none">
                                <button type="submit" id="applied">APPLIED</button>
                            </form>

                            <% } else { %>
                                <form action="/users/<%=user._id%>/School/job/<%= job._id %>/apply" method="POST">
                                    <button type="submit">APPLY</button>
                                </form>
                                <% } %>
                    </div>
                </a>
        <% }) %>
    </div>
    

    <%- include('../partials/_footer.ejs') %>
```

The above code is the index.ejs page for the candidate. The use of embede JavaScript allows for all of the different tabs to direc to this page with minor tweeks to the job block. The tweaks remove and add the ability to click when needed when necassary.

## Plan for the future and takeaways

* I allowed for more time in desgining the page than the last project, however as there are two distinct user types this became cumbersome.
* I would like to improve the client size visualisation as well as complete the functionlity of offering jobs and accepting jobs.
* When offering a job it should be limited to 3 candidates who have 30 minutes to accept before it can be offered to more. Once one accepts no others should be able to.
* Additionally I would like to add pages for error messages and pop ups for if passwords dont match in signup processes.


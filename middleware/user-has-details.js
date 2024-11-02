
const userHasDetails = (req, res, next) => {
    if (req.session.user.details) return next();
    res.redirect(`/users/${req.session.user._id}/details/${req.session.user.detailsType}`);
};

module.exports = userHasDetails;
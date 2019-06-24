module.exports = {
    checkLoggedIn
};

function checkLoggedIn(req, res, next) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
}

const withAuth = (req, res, next) => {
    if (!req.session.password) {
        res.redirect('/login')
    } else {
        next();
    }
}
module.exports = withAuth
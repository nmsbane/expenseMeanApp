var middlewareObj = {};

// create a middleware which will check if the user is logged in or not
middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();   
    } 
    res.redirect('/auth/login');
};

module.exports = middlewareObj;
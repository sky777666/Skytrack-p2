// import nessessary libaries and modules 

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');


// serialize user   - cb = callback
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
})
// deserialized version  - cb = callback
passport.deserializeUser(function(id, callback) {
    db.user.findByPk(id).then(function(user) {
        callback(null, user);
    }).catch(function(err) {
        callback(err, null);
    });
})

//config local variables / settings in passport
passport.use(new LocalStrategy({ 
usernameField: 'email',
passwordField: 'password'
}, function(email, password, callback) {
    db.user.findOne({ where: { email: email}}).then(function(user) {
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(function(err) {
        callback(err, null);
    });

}));


module.exports = passport;
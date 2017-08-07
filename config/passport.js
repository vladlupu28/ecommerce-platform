var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var User = models.User;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, handler))
};

    function handler(req, reqEmail, password, done) {
        process.nextTick(function() {
        User.findOne({where : { email :  reqEmail }})
            .then((user) => {
                if (!user) {
                var reqPassword = User.generateHash(password);
                User.create({ email: reqEmail, password: reqPassword})
                    .then((newUser) => {
                        return done(null, newUser);
                    })
                    .catch((error) => {
                        console.log(error);
                        return done(error);
                    })
                }
                else { 
                    return done(null, false, {message : 'That email is already taken.'});
                }
            })
            .catch((err) => {
                    return done(err);
            })
            })

        }

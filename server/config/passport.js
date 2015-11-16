/**
 * Created by linh on 5/13/15.
 */
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var userModel = require('../app/models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        userModel.findById(id, function (err, user) {
            done(null, user);
        })
    });
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, email, password, done) {
            console.log('Signup');
            process.nextTick(function () {
                userModel.findOne({'local.email': email}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, 'Email already taken');
                    } else {
                        var newUser = new userModel();
                        newUser.name = email;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

//                        newUser.local.password = password;
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }

                })
            })
        }
    ));
    passport.use('local-login', new LocalStrategy({
            emailField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                userModel.findOne({ 'local.email': email}, function (err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, 'No User found');

                    if(!user.validPassword(password)){
                        return done(null, false, 'Invalid password');
                    }
                    return done(null, user);
                });
            });
        }
    ));

    passport.use(new BearerStrategy({},
        function (token, done) {
            userModel.findOne({ _id: token }, function (err, user) {
                if (!user)
                    return done(null, false);
                return done(null, user);
            });
        }));

};
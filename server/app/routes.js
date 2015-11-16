var userModel = require('./models/user');
module.exports = function (app, passport) {

//    http://stackoverflow.com/questions/27484911/how-to-combine-passport-and-angular-ui-routing
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (user === false) {
                res.status(401).send('Error 401');
            } else {
                res.status(200).send(user);
            }
        })(req, res, next);
    });

//    http://stackoverflow.com/questions/23477926/passportjs-after-successful-login
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                return res.send({ success: false, message: info.message });
            }
            return res.send({ success: true, message: 'Sign up succeeded' });
        })(req, res, next);
    });
    app.post('/changePassword', function (req, res, next) {
        var currentPassword = req.body['currentpassword'];
        var newPassword = req.body['newpassword'];
        var confirmPassword = req.body['confirmpassword'];
        var username = req.body['username'];

        if ((newPassword) && (newPassword.trim() != '') && (newPassword === confirmPassword)) {
            userModel.findOne({ 'local.email': username}, function (err, user) {
                console.log('Username:' + username);
                if (err)
                    res.status(405).send('Error: ' + err.message);
                if (!user) {
                    res.status(200).send('No User found');
                }
                else {
                    if (!user.validPassword(currentPassword)) {
                        res.status(200).send('Invalid password');
                    }
                    else
                    {
                        console.log('Name: ' + user.name);
                        user.local.password = user.generateHash(newPassword);
                        return user.save(function (err) {
                            if (!err) {
                                console.log("updated");
                            } else {
                                console.log(err);
                            }
                            return res.send(user);
                        });
                    }
                }

//                res.status(200).send('Ok');
            });
        }
        else {
            res.status(200).send('Error');

        }

    });
    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).send('Log out');
    });

};

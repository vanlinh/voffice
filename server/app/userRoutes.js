var fs = require('fs');
var userModel = require('./models/user');

module.exports = function (router, passport) {
    router.use(passport.authenticate('bearer', { session: false }));
    router.use(function (req, res, next) {
        fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
            function (err) {
                next();
            });
    });

    function getUser(req, res) {
        var q = req.query.q;
        var pageSize = req.query.pageSize > 0 ? req.query.pageSize : 10;
        var page = req.query.page > 0 ? req.query.page : 0;
        var skip = pageSize * page;
        var query = {};

        var options = {
            "limit": pageSize,
            "skip": skip,
            "sort": {'order': 'asc'}};

        var fields = {
            'clientId': true,
            'name': true,
            'imageId': true,
            'status': true,
            'type': true,
            'createDate': true,
            'local.email': true,
            'local.password': true,
            'facebook.email': true,
            'google.email': true
        };

        userModel.find(
            query, fields, options,
            function (err, users) {
                if (err) {
                    console.log(err.message);
                }
                userModel.count().exec(function (err, count) {
                    res.json({
                        page: parseInt(page, 10),
                        pageSize: parseInt(pageSize, 10),
                        total: count,
                        pages: parseInt(count / pageSize) + 1,
                        results: users
                    })
                });
            }
        );
    }

    router.get('/user', function (req, res) {
        getUser(req, res);
    });

    router.get('/user/:id', function (req, res) {
        return userModel.findById(req.params.id, function (err, user) {
            if (!err) {
                return res.send(user);
            } else {
                return console.log(err);
            }
        });
    });

    router.delete('/user/:id', function (req, res) {
        return userModel.findById(req.params.id, function (err, user) {
            return user.remove(function (err) {
                if (!err) {
                    console.log("removed");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
    });

    router.put('/user/:id', function (req, res) {
        return userModel.findById(req.params.id, function (err, user) {
            console.log(req.body);
            user.name = req.body['name'];
            user.imageId = req.body['imageId'];
            user.clientId = req.body['clientId'];
            user.status = req.body['status'];
            user.type = req.body['type'];
//            user.facebook.email = req.body['facebook.email'];
//            user.google.email = req.body['google.email'];
            return user.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(user);
            });
        });
    });


};
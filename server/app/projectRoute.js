var fs = require('fs');
var Promise = require('bluebird');
var projectModel = require('./models/project');


module.exports = function (router, passport) {
//    router.use(passport.authenticate('bearer', { session: false }));
//    router.use(function (req, res, next) {
//        fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
//            function (err) {
//                next();
//            });
//    });
    //Project -- Begin
    function getProject(req, res) {
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
            'description': true,
            'createUser': true,
            'priority': true,
            'order': true,
            'status': true,
            'dueDate': true,
            'customer': true,
            'createDate': true
        };

        projectModel.find(
            query, fields, options,
            function (err, projects) {
                if (err) {
                    console.log(err.message);
                }
                projectModel.count().exec(function (err, count) {
                    res.json({
                        page: parseInt(page, 10),
                        pageSize: parseInt(pageSize, 10),
                        total: count,
                        pages: parseInt(count / pageSize) + 1,
                        results: projects
                    })
                });
            }
        );
    }

    router.get('/project', function (req, res) {
        getProject(req, res);
    });

    router.get('/project/:id', function (req, res) {
        return projectModel.findById(req.params.id, function (err, project) {
            if (!err) {
                return res.send(project);
            } else {
                return console.log(err);
            }
        });
    });

    router.delete('/project/:id', function (req, res) {
        return projectModel.findById(req.params.id, function (err, project) {
            return project.remove(function (err) {
                if (!err) {
                    console.log("removed");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
    });
    router.post('/project', function (req, res) {
        if (typeof req.headers['clientid'] === 'undefined') {
            res.status(403).send('Server failed to authenticate the request. ' + err.message);
        }
        else {
            projectModel.create({
                createDate: Date.now(),
                clientId: req.headers['clientid'],
                name: req.body.name,
                description: req.body.description,
                priority: req.body.priority,
                order: req.body.order,
                type: req.body.type,
                status: req.body.status,
                dueDate: req.body.dueDate,
                createUser: req.body.createUser,
                customer: req.body.customerId
            }, function (err, post) {
                if (err) {
                    res.status(403).send(err.message);
                }
                res.json(post);
            });
        }
    });

    router.put('/project/:id', function (req, res) {
        return projectModel.findById(req.params.id, function (err, project) {
            project.name = req.body.name;
            project.description = req.body.description;
            project.priority = req.body.priority;
            project.order = req.body.order;
            project.dueDate = req.body.dueDate;
            project.status = req.body.status;
            project.type = req.body.type;
            project.customerId = req.body.customerId;

            return project.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(project);
            });
        });
    });


};

module.exports.seedProjects = function () {
    
    return new Promise(function (resolve, reject) {
            projectModel.find({}).exec(function (error, collection) {
                 if (collection.length === 0) {
                    projectModel.create({name: 'Project 01', description: 'Project Description 01'});
                    projectModel.create({name: 'Project 02', description: 'Project Description 02'});
                    projectModel.create({name: 'Project 03', description: 'Project Description 03'}, resolve);
                }

            })
        }
    )
};
var expect = require("chai").expect,
    Promise = require("bluebird"),
    mongoose = require('mongoose'),
    config = require('../../server/config/config'),
    projectModel = require('../../server/app/projectRoute');


var resetProjects = function () {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collections['projects'].drop(resolve, reject);
    })

};
function findProjects(query) {
    return Promise.cast(mongoose.model('project').find(query).exec());
}


describe("init Project", function () {
    var projects;
    before(function (done) {
        mongoose.connect(config.url, function () {
            resetProjects()
                .then(projectModel.seedProjects)
                .then(findProjects)
                .then(function (collection) {
                    projects = collection;
                    done();
                })
        });
    });

    it("should never be empty since projects are seeded", function () {
        expect(projects.length).to.be.at.least(3);
    });
    it("project should have a name", function(){
        expect(projects[0].name).to.not.be.empty;
    });
    it("project should have a createDate", function(){
         expect(projects[0].createDate).to.not.be.null;
    })

});

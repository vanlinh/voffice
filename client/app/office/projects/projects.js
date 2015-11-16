/**
 * Created by linh on 11/13/15.
 */
angular.module("projects", ["service.CRUD"]);
angular.module("projects").controller("listProjects", function ($scope, CRUD, SETTING) {
    var loadProject = function () {
        $scope.loading = true;
        var url = SETTING.baseUrl + '/project';
        CRUD.get(url, function (data) {
             $scope.projects=data.results;
         }, function () {
         });
    };
    loadProject();
});

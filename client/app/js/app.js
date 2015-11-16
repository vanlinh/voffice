angular.module("voffice",[
    'office',
    'tasks',
    'projects',
    'ui.router',
    'service.CRUD',
    'ngCookies'

])

.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /office
    $urlRouterProvider.otherwise("/office");

    $stateProvider
        .state('office', {
            url: "/office",
            templateUrl: "office/office.html"
        })
        .state('office.tasks', {
            url: "/tasks",
            templateUrl: "office/tasks/tasks.html",
            controller: "listTaskController"

        })
        .state('office.projects', {
            url: "/projects",
            templateUrl: "office/projects/projects.html",
            controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('customers', {
            url: "/customers",
            templateUrl: "customers/customers.html"
        })
        .state('customers.orders', {
            url: "/list",
            templateUrl: "customers/orders.html",
            controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        })
        .state('bookkeeping', {
            url: "/bookkeeping",
            templateUrl: "bookkeeping/bookkeeping.html"
        })
});
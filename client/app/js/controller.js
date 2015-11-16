angular.module("voffice")
    .controller('sidebarController', function ($scope,  $location, $cookies) {

        $scope.loadMenuList = function () {
            $scope.items = [
                {
                    name: 'MY TASKS',
                    url: '.tasks',
                    icon: 'fa fa-camera-retro',
                    active: true
                },
                {
                    name: 'PROJECTS',
                    url: '.projects',
                    url2: 'newProject',
                    icon: 'fa fa-camera-retro',
                    active: true,
                    submenus: [
                        {
                            name: 'Project 01',
                            url: 'mytasks'
                        },
                        {
                            name: 'Project 02',
                            url: 'task'
                        },
                        {
                            name: 'Add Project',
                            url: 'task'
                        }
                    ]
                }

            ]
        };
        $scope.loadMenuList(); //Must load before load data

//        $scope.currentPage = function (submenu) {
//            if ($routeParams.widgetName == submenu.url) {
//                return 'active';
//            }
//        };
//        $scope.isActive = function (item) {
//            for (var i = 0; i < item.submenus.length; i++) {
//                if (item.submenus[i].url == $routeParams.widgetName) {
//                    return 'active';
//                }
//            }
//            return null;
//        }
    });

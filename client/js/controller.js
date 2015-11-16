angular.module('web')
    .controller('web', function($scope, $uibModal, $log){
        $scope.signUp = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'template/signup.html',
                controller: 'RegisterController',
                windowClass: 'sign-up-modal-window',
                 resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.login = function () {

            var loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'template/login.html',
                controller: 'LoginController',
                windowClass: 'login-modal-window',
                resolve: {
                    items: function () {
                        return $scope.user;
                    }
                }
            });

            loginModal.result.then(function (user) {
                $scope.user = user;
                alert(user.password);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    })


angular.module('web').controller('RegisterController', function ($scope, $uibModalInstance) {
    $scope.user = {};
    $scope.date= new Date();
    $scope.money=1000;


    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.save = function () {
        alert($scope.user.email);
    };
});

angular.module('web').controller('LoginController', function ($scope, $uibModalInstance, items) {
    $scope.user = {};
    $scope.login = function () {
        alert('Email: ' + $scope.user.email + ' with password: ' + $scope.user.password);
     };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
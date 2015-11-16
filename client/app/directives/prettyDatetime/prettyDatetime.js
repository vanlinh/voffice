angular.module('voffice')
    .directive('prettyDatetime', function () {
        return{
            restrict: 'E',
            scope: { date: '@'},
            controller: function ($scope) {
                var prettyDatetime = function (orgDate) {
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var MMDD = new Date(orgDate);
                    var hour = ("00" + MMDD.getHours()).slice(-2);
                    var min = ("00" + MMDD.getMinutes()).slice(-2);
                    MMDD.setHours(0, 0, 0, 0);
                    var today = new Date();

                    today.setHours(0, 0, 0, 0);

                    var yesterday = new Date();
                    yesterday.setHours(0, 0, 0, 0);
                    yesterday.setDate(yesterday.getDate() - 1);

                    var tomorrow = new Date();
                    tomorrow.setHours(0, 0, 0, 0);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    var strDate = "";
                    if (today.getTime() == MMDD.getTime()) {
                        strDate = "Today " + hour + ":" + min;
                        $scope.status = 1;
                    } else if (yesterday.getTime() == MMDD.getTime()) {
                        strDate = "Yesterday";//  + hour + ": " + min;
                        $scope.status = 1;

                    } else if (tomorrow.getTime() == MMDD.getTime()) {
                        strDate = "Tomorrow " + hour + ":" + min;
                        $scope.status = 2;

                    } else {
                        if (MMDD > tomorrow) {
                            $scope.status = 3;
                        }
                        else {
                            $scope.status = 1;
                        }
                        if (today.getYear() == MMDD.getYear()) {
                            strDate = months[MMDD.getMonth()] + " " + MMDD.getDate();
                        } else {
                            strDate = months[MMDD.getMonth()] + " " + MMDD.getDate() + "," + MMDD.getYear();
                        }
                    }
                    $scope.prettyDatetime = strDate;

                };
                if (!$scope.date) {
                    $scope.prettyDatetime = '';
                    $scope.status = 0;
                }
                else {
                    prettyDatetime($scope.date);
                }
            },
            templateUrl: '../app/directives/prettyDatetime/prettyDatetime.html'
        }
            ;
    })
;
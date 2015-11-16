/**
 * Created by linh on 11/5/15.
 */
'use strict';

describe('First ', function () {
    beforeEach(module('web'));
    var $controller;
    beforeEach(inject(function ($controller1) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = $controller1;
    }));

    describe('Test title', function () {
        it('Title variable should be vss', function () {
            var $scope = {};
            var controller = $controller('web1', { $scope: $scope });
            dump($scope.title);
            expect($scope.title).toEqual('vss');
        });
    });
});
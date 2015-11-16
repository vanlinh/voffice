/**
 * Created by linh on 11/12/15.
 */
angular.module('voffice').directive('navToggle', function () {
    return function (scope, element, attrs) {

        jQuery(element).click(function (event) {
            if ($('#wrapper').hasClass('maximum-view')) {
                $('#wrapper').removeClass('maximum-view');
            }
            else {
                $('#wrapper').addClass('maximum-view');
            }
        });
    }
});
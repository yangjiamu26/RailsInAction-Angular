'use strict';
angular.module('ngJquerySteps', []).directive('jquerysteps', function() {
    return {
        restrict: 'E',
        link: function($scope, $element, $attrs) {
            $element.steps({
                headerTag: "h3",
                bodyTag: "section",
                transitionEffect: "slideLeft",
                autoFocus: true
            });
        }
    };
});
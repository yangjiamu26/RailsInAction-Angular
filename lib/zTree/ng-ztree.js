'use strict';
angular.module('ngZtree', []).directive('ngztree', function() {
	return {
		restrict: 'E',
		scope: {
            setting: "=",
            data: "="
        },
		link: function($scope, $element, $attrs) {
			$element.append("<div class='ztree'></div>");
			$.fn.zTree.init($element.find('div.ztree'), $scope.setting, $scope.data);
		}
	};
});